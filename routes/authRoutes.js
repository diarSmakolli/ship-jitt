const express = require('express');
const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { verifyToken, isVerified, isPaid, hasAccess, isAdmin } = require('../middleware/authMiddleware');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');
const moment = require('moment-timezone');
const { time } = require('console');
const mailgun = require('mailgun-js');
const { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail } = require('../services/email');
const fs = require('fs');
const { Invoice } = require('../models');
const { Notification } = require('../models');
const GithubRequest = require('../models/GithubRequest');
const PDFDocument = require('pdfkit');
const { generateInvoicePDF } = require('../services/generateInvoicePdf');
const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');

// mailgun config
const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});

// set storage engine for multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

// initialize multer upload 
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2000000 }
}).single('profile_picture');

router.get('/profile-picture/uploads/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '..', 'uploads', filename); // Adjusted path to go up one directory level

        if (!fs.existsSync(filePath)) {
            return res.status(404).send({ message: 'File not found.' });
        }

        return res.sendFile(filePath);
    } catch (error) {
        console.error('Error fetching file', error);
        return res.status(500).send({ message: 'Server error while fetching file.' });
    }
});

// update the user profile picture - unchecked  ✅
router.post('/update-profile-picture/:id', verifyToken, async(req, res) => {
    const userId = req.params.id;
    const { updatedAt, updatedBy, timeZone } = req.body;
    try {
        const user = await User.findByPk(userId);

        if(!user) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'User not found!'
            })
        }

        if(user.deletedAt) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This user has been deleted.'
            })
        }

        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        upload(req, res, async (err) => {
            if (err) {
                // Handle upload errors
                console.error(err);
                return res.status(500).json({ error: 'Error uploading file.' });
            } else {
                if (req.file) {
                    // File uploaded successfully
                    const profilePicturePath = req.file.path; // Store the path to the uploaded file
                    // Update user's profile picture in the database

                    const updatedAtTimeZone = moment().tz(selectedTimeZone).format();

                    await user.update({ profile_picture: profilePicturePath, updatedAt: updatedAtTimeZone, updatedBy});
                    return res.status(200).json({
                        status: 'success',
                        statusCode: 200,
                        message: 'Profile picture updated successfully.'
                    });
                } else {
                    // No file uploaded
                    return res.status(400).json({ error: 'No file uploaded.' });
                }
            }
        });
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// register user and sent the verification email  ✅
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, createdAt, timeZone } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email: email } });

        if (existingUser) {
            if(existingUser.deletedAt) {
                return res.status(401).json({
                    status: 'error',
                    statusCode: 401,
                    message: 'This user has been deleted.'
                })
            }
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'User with this email already exists.'
            });
        }



        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = jwt.sign({ email: email }, process.env.SECRETJWT, { expiresIn: '1h' });

        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        let createdAtTimeZone = moment().tz(selectedTimeZone).format();

        console.log(createdAtTimeZone);

        const newUser = await User.create({
            first_name,
            last_name,
            email: email,
            password: hashedPassword,
            createdAt: createdAtTimeZone
        });

        await sendWelcomeEmail(email, first_name);


        res.status(201).json({
            status: 'success',
            statusCode: 201,
            message: 'User registered successfully.',
            newUser,
            createdAt: createdAtTimeZone
        });
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// login user if isVerified is true if not send email verify account  ✅
router.post('/login', async (req, res) => {
    const { email, password, verification_token, createdBy, timeZone, updatedAt } = req.body;
    try {

        if(!email || !password) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'Email and password are required.'
            });
        }
    
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'User not found.'
            });
        }

        if(user.deletedAt) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This user has been deleted.'
            })  
        }

        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        const updatedAtTimeZone = moment().tz(selectedTimeZone).format();

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'error',
                statusCode: 401,
                message: 'Invalid password.'
            });
        }

        if (!user.isVerify) {
            // Resend verification email
            const verificationToken = jwt.sign({ email: email }, process.env.SECRETJWT, { expiresIn: '1h' });
            await User.update({ verification_token: verificationToken, updatedAt: updatedAtTimeZone }, { where: { email: email } });

            await sendVerificationEmail(email, verificationToken);

            return res.status(403).json({
                status: 'error',
                statusCode: 403,
                message: 'Email not verified. Verification email sent.'
            });
        }

        // last login
        const lastLogin = moment().tz(selectedTimeZone).format();

        await User.update({ lastLoginAt: lastLogin, updatedAt: updatedAtTimeZone }, { where: { email: email } });
        
       
        const token = jwt.sign({ id: user.id }, process.env.SECRETJWT, { expiresIn: '1h' });

        res.cookie('token', token, {httpOnly: true, secure: false });

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            token: token,
            message: 'User logged in successfully.',
        });
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// send email verification link  ✅
router.post('/send-verification-email', async(req, res) => {
    const { email, timeZone } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'User not found.'
            });
        }
        if (user.isVerify) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'User is already verified.'
            });
        }
        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;
        const verificationToken = jwt.sign({ email: email }, process.env.SECRETJWT, { expiresIn: '1h' });
        await sendVerificationEmail(email, verificationToken);

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Verification email sent successfully.'
        });

    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
})

// verify email  ✅
router.get('/verify-email', async(req, res) => {
    const { token } = req.query;
    const { timeZone } = req.body;
    try {
        const decodedToken = jwt.verify(token, process.env.SECRETJWT);
        const { email } = decodedToken;

        // find the user by email
        const userByEmail = await User.findOne({ where: { email: email } });

        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        const updatedAtTimeZone = moment().tz(selectedTimeZone);

        if(userByEmail.isVerify) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'Email already verified.'
            });
        }

        

        await User.update({ isVerify: true, updatedAt: updatedAtTimeZone }, { where: { email: email } });

        await Notification.create({
            title: 'Account Successfully Verified',
            message: `Congratulations! Your account has been successfully verified. Thank you for completing the verification process.`,
            read: false,
            userId: userByEmail.id,
            createdAt: updatedAtTimeZone
        });

        res.status(200).json({
            status: 'success',
            message: 'Email verification successful.',
        });
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// log out
router.post('/logout', verifyToken, async(req, res) => {
    try {
        res.clearCookie('token');

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'User logged out successfully.'
        });
    } catch(error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// update all the fiedls - Admin ✅
router.put('/update-user/:id', verifyToken, async(req, res) => {
    const userId = req.params.id;
    const { timeZone, updatedAt, updatedBy, ...userData } = req.body;
    try {

        let user = await User.findByPk(userId);

        if(!user) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'User not found.'
            });
        }

        if(user.deletedAt) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This user has been deleted.'
            })
        }


        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        let updatedAtTimeZone = moment().tz(selectedTimeZone).format();

        console.log(updatedAtTimeZone);

        if(userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }

        const updatedUser = await user.update({
            ...userData,
            updatedAt: updatedAtTimeZone,
            updatedBy: updatedBy
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200, 
            message: 'User updated successfully.',
            user: updatedUser,
            updatedAt: updatedAtTimeZone
        })

    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// change password ✅
router.put('/change-password/:id', verifyToken, async(req, res) => {
    const userId = req.params.id;
    const { current_password, new_password, confirm_password, updatedAt, updatedBy, timeZone } = req.body;
    try {
        const user = await User.findByPk(userId);

        if(!user) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'User not found'
            });
        }

        if(user.deletedAt) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This user has been deleted.'
            })
        }

        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        const updatedAtTimeZone = moment().tz(selectedTimeZone).format();

        console.log(updatedAtTimeZone);

        const isPasswordValid = await bcrypt.compare(current_password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({
                status: 'error',
                statusCode: 401,
                message: 'Current password is incorrect.'
            });
        }

        if(new_password != confirm_password) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'New password and confirm password does not match.'
            })
        }

        const hashedNewPassword = await bcrypt.hash(new_password, 10);

        await user.update({ password: hashedNewPassword, updatedAt: updatedAtTimeZone, updatedBy });

        await Notification.create({
            title: 'Password Successfully Changed',
            message: `Your password has been successfully updated. For your security, please ensure that this change was made by you. If you did not request this change, contact our support team immediately.`,
            read: false,
            userId: userByEmail.id,
            createdAt: updatedAtTimeZone
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Password updated successfully',
            user,
            updatedAt: updatedAtTimeZone
        })
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
})

// get all users with the pagination - admin  ✅
// router.get('/getall', verifyToken, async(req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = parseInt(req.query.pageSize) || 5;
//     const search = req.query.search || '';
//     const { timeZone } = req.body;
//     try {
//         const users = await User.findAll({
//             where: { deletedAt: null },
//             order: [['createdAt', 'DESC']],
//             limit: pageSize,
//             offset: (page - 1) * pageSize
//         });

//         if(users.length === 0) {
//             return res.status(404).json({
//                 status: 'error',
//                 statusCode: 404,
//                 message: 'Users not found'
//             });
//         }

//         const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

//         const formattedUsers = users.map(user => {
//             return {
//                 ...user.toJSON(),
//                 createdAt: moment(user.createdAt).tz(selectedTimeZone).format(),
//                 updatedAt: moment(user.updatedAt).tz(selectedTimeZone).format(),
//                 deletedAt: moment(user.deletedAt).tz(selectedTimeZone).format(),
//                 resetTokenExpiry: moment(user.resetTokenExpiry).tz(selectedTimeZone).format()
//             }
//         })

//         return res.status(200).json({
//             status: 'success', 
//             statusCode: 200,
//             message: 'Users retrieved successfully.',
//             users: formattedUsers
//         });
//     } catch (error) {
//         console.error("An Error has occurred and we're working to fix the problem!");
//         console.error(error);
//         res.status(500).json({
//             status: 'error',
//             statusCode: 500,
//             message: "An Error has occurred and we're working to fix the problem!"
//         });
//     }
// })

router.get('/getall', verifyToken, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const search = req.query.search || ''; // Add search query parameter
    const { timeZone } = req.body;

    try {
        // Define the where clause with optional search criteria
        const whereClause = {
            deletedAt: null,
            [Op.or]: [
                { first_name: { [Op.like]: `%${search}%` } },
                { last_name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } }
            ]
        };

        const users = await User.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            limit: pageSize,
            offset: (page - 1) * pageSize
        });

        if (users.length === 0) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'Users not found'
            });
        }

        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        const formattedUsers = users.map(user => {
            return {
                ...user.toJSON(),
                createdAt: moment(user.createdAt).tz(selectedTimeZone).format(),
                updatedAt: moment(user.updatedAt).tz(selectedTimeZone).format(),
                deletedAt: moment(user.deletedAt).tz(selectedTimeZone).format(),
                resetTokenExpiry: moment(user.resetTokenExpiry).tz(selectedTimeZone).format()
            };
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Users retrieved successfully.',
            users: formattedUsers
        });
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// Queries

// total users count
router.get('/total-users', verifyToken, async(req, res) => {
    try {
        const totalUsers = await User.count();
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Total users count retrieved successfully.',
            totalUsers
        });
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// total active users count
router.get('/active-users', verifyToken, async (req, res) => {
    try {
        const activeUsers = await User.count({
            where: {
                hasAccess: true,
                deletedAt: null
            }
        });
        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            activeUsers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch active users.'
        });
    }
});

// last 7 days
router.get('/recent-users', verifyToken, async (req, res) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentUsers = await User.count({
            where: {
                createdAt: {
                    [Op.gte]: sevenDaysAgo
                },
                deletedAt: null
            }
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            recentUsers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch recent users.'
        });
    }
});

// get count users which have deletedAt not null
router.get('/count-unactive', verifyToken, async (req, res) => {
    try {
        const deletedUsers = await User.count({
            where: {
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            deletedUsers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch deleted users.'
        });
    }
});

// user retention count - have lastLoginAt in DB
router.get('/user-retention', verifyToken, async (req, res) => {
    try {
        const userRetention = await User.count({
            where: {
                lastLoginAt: {
                    [Op.not]: null
                }
            }
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            userRetention
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch user retention count.'
        });
    }
});

// average invoice amount
router.get('/average-invoice-amount', verifyToken, async (req, res) => {
    try {
        const averageInvoiceAmount = await Invoice.findOne({
            attributes: [
                [sequelize.fn('AVG', sequelize.col('amount')), 'avgAmount']
            ]
        });
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            averageInvoiceAmount: averageInvoiceAmount.getDataValue('avgAmount')
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch average invoice amount.'
        });
    }
});

router.get('/total-revenue', verifyToken, async (req, res) => {
    // const { startDate, endDate } = req.query;
    try {
        const totalRevenue = await Invoice.sum('amount', {
            
        });
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            totalRevenue
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch total revenue.'
        });
    }
});

// build an query to calculate users with invoices percentage ✅
router.get('/invoices-this-month', verifyToken, async (req, res) => {
    try {
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59);

        const invoicesThisMonth = await Invoice.count({
            where: {
                date: {
                    [Op.between]: [startOfMonth, endOfMonth]
                }
            }
        });

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            invoicesThisMonth
        });
    } catch (error) {
        console.error("An error occurred while fetching invoices for this month:", error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An error occurred while fetching invoices for this month."
        });
    }
});

// Daily Active Users (DAU)
router.get('/daily-active-users', verifyToken, async (req, res) => {
    try {
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);

        const dailyActiveUsers = await User.count({
            where: {
                lastLoginAt: {
                    [Op.gte]: oneDayAgo
                }
            }
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            dailyActiveUsers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch daily active users.'
        });
    }
});

// Monthly Active Users (MAU)
router.get('/monthly-active-users', verifyToken, async (req, res) => {
    try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

        const monthlyActiveUsers = await User.count({
            where: {
                lastLoginAt: {
                    [Op.gte]: oneMonthAgo
                }
            }
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            monthlyActiveUsers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch monthly active users.'
        });
    }
});

// User Growth Over Time
router.get('/user-growth', verifyToken, async (req, res) => {
    try {
        const usersByDay = await User.findAll({
            attributes: [
                [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            group: ['date'],
            order: [['date', 'ASC']]
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            usersByDay
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch user growth data.'
        });
    }
});

// Average Revenue Per User (ARPU)
router.get('/arpu', verifyToken, async (req, res) => {
    try {
        const totalRevenue = await Invoice.sum('amount');
        const totalUsers = await User.count();

        const arpu = totalRevenue / totalUsers;

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            arpu: arpu.toFixed(2)
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to calculate ARPU.'
        });
    }
});

// Weekly Active Users (WAU)
router.get('/metrics/weekly-active-users', verifyToken, async (req, res) => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const weeklyActiveUsers = await User.count({
            where: {
                lastLoginAt: {
                    [Op.gte]: oneWeekAgo
                }
            }
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            weeklyActiveUsers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch weekly active users.'
        });
    }
});

router.get('/metrics/monthly-retention-rate', verifyToken, async (req, res) => {
    try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

        const totalUsers = await User.count();
        const retainedUsers = await User.count({
            where: {
                lastLoginAt: {
                    [Op.gte]: oneMonthAgo
                }
            }
        });

        const retentionRate = (retainedUsers / totalUsers) * 100;

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            retentionRate: retentionRate.toFixed(2)
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch monthly retention rate.'
        });
    }
});

router.get('/metrics/revenue-growth', verifyToken, async (req, res) => {
    try {
        const revenueGrowth = await Invoice.findAll({
            attributes: [
                [sequelize.fn('DATE', sequelize.col('date')), 'date'],
                [sequelize.fn('SUM', sequelize.col('amount')), 'totalRevenue']
            ],
            group: ['date'],
            order: [['date', 'ASC']]
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            revenueGrowth
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch revenue growth data.'
        });
    }
});

router.get('/metrics/invoice-count', verifyToken, async (req, res) => {
    try {
        const invoiceCount = await Invoice.findAll({
            attributes: [
                [sequelize.fn('DATE', sequelize.col('date')), 'date'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'invoiceCount']
            ],
            group: ['date'],
            order: [['date', 'ASC']]
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            invoiceCount
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch invoice count data.'
        });
    }
});

router.get('/metrics/arpu-growth', verifyToken, async (req, res) => {
    try {
        const arpuGrowth = await Invoice.findAll({
            attributes: [
                [sequelize.fn('DATE', sequelize.col('date')), 'date'],
                [sequelize.literal('SUM(amount) / COUNT(DISTINCT "userId")'), 'averageRevenuePerUser']
            ],
            group: ['date'],
            order: [['date', 'ASC']]
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            arpuGrowth
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch ARPU growth data.'
        });
    }
});

router.get('/metrics/daily-active-users', verifyToken, async (req, res) => {
    try {
        const dailyActiveUsers = await User.findAll({
            attributes: [
                [
                    sequelize.fn(
                        'DATE_TRUNC', 
                        'day', 
                        sequelize.literal(`"lastLoginAt" AT TIME ZONE 'UTC'`)
                    ), 
                    'date'
                ],
                [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('id'))), 'activeUsers']
            ],
            where: {
                lastLoginAt: {
                    [Sequelize.Op.gte]: sequelize.literal("NOW() - INTERVAL '1 month'")
                }
            },
            group: [sequelize.fn('DATE_TRUNC', 'day', sequelize.literal(`"lastLoginAt" AT TIME ZONE 'UTC'`))],
            order: [[sequelize.fn('DATE_TRUNC', 'day', sequelize.literal(`"lastLoginAt" AT TIME ZONE 'UTC'`)), 'ASC']]
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            dailyActiveUsers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch daily active users.'
        });
    }
});

router.get('/metrics/new-users-over-time', verifyToken, async (req, res) => {
    try {
        const newUsersOverTime = await User.findAll({
            attributes: [
                [sequelize.fn('DATE_TRUNC', 'day', sequelize.col('createdAt')), 'date'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'newUsers']
            ],
            where: {
                createdAt: {
                    [Sequelize.Op.gte]: sequelize.literal("NOW() - INTERVAL '3 months'")
                }
            },
            group: [sequelize.fn('DATE_TRUNC', 'day', sequelize.col('createdAt'))],
            order: [[sequelize.fn('DATE_TRUNC', 'day', sequelize.col('createdAt')), 'ASC']]
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            newUsersOverTime
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch new users over time.'
        });
    }
});

// Revenue every month from the first data in DB
router.get('/metrics/revenue-monthly-growth', verifyToken, async (req, res) => {
    try {
        const revenueGrowth = await Invoice.findAll({
            attributes: [
                [sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM "date"')), 'year'], // Extract year from createdAt
                [sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "date"')), 'month'], // Extract month from createdAt
                [sequelize.fn('SUM', sequelize.col('amount')), 'totalRevenue'] // Sum of amounts for each month
            ],
            group: ['year', 'month'], // Group by year and month
            order: [
                [sequelize.literal('EXTRACT(YEAR FROM "date")'), 'ASC'],
                [sequelize.literal('EXTRACT(MONTH FROM "date")'), 'ASC']
            ] // Order by year and month
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: revenueGrowth
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch monthly revenue growth data.',
            error: error.message // Provide additional error details
        });
    }
});

// Revenue every week last 3 months
router.get('/metrics/revenue-weekly', verifyToken, async (req, res) => {
    try {
        // Get the current date and calculate the date three months ago
        const today = moment().startOf('day');
        const threeMonthsAgo = today.clone().subtract(3, 'months');

        // Find all invoices within the last three months and group by week
        const weeklyRevenue = await Invoice.findAll({
            attributes: [
                [sequelize.fn('EXTRACT', sequelize.literal('WEEK FROM "date"')), 'week'], // Extract week from date
                [sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM "date"')), 'year'],
                 // Extract year to avoid overlap of weeks across years
                 [sequelize.fn('DATE', sequelize.col('date')), 'date'],
                [sequelize.fn('SUM', sequelize.col('amount')), 'totalRevenue'] // Sum of amounts for each week
            ],
            where: {
                date: {
                    [Op.between]: [threeMonthsAgo.toDate(), today.toDate()] // Filter to last three months
                }
            },
            group: ['year', 'week', 'date'], // Group by year and week
            order: [
                [sequelize.literal('EXTRACT(YEAR FROM "date")'), 'ASC'],
                [sequelize.literal('EXTRACT(WEEK FROM "date")'), 'ASC']
            ] // Order by year and week
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: weeklyRevenue
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch weekly revenue data.',
            error: error.message // Provide additional error details
        });
    }
});

// Invoices every month from the first data in DB
router.get('/metrics/invoices-monthly-growth', verifyToken, async (req, res) => {
    try {
        const invoiceGrowth = await Invoice.findAll({
            attributes: [
                [sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM "date"')), 'year'], // Extract year from createdAt
                [sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "date"')), 'month'], // Extract month from createdAt
                [sequelize.fn('COUNT', sequelize.col('id')), 'invoiceCount'] // Sum of amounts for each month
            ],
            group: ['year', 'month'], // Group by year and month
            order: [
                [sequelize.literal('EXTRACT(YEAR FROM "date")'), 'ASC'],
                [sequelize.literal('EXTRACT(MONTH FROM "date")'), 'ASC']
            ] // Order by year and month
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: invoiceGrowth
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch monthly revenue growth data.',
            error: error.message // Provide additional error details
        });
    }
});

// Invoices every week last 3 months
router.get('/metrics/invoices-weekly', verifyToken, async (req, res) => {
    try {
        // Get the current date and calculate the date three months ago
        const today = moment().startOf('day');
        const threeMonthsAgo = today.clone().subtract(3, 'months');

        // Find all invoices within the last three months and group by week
        const weeklyInvoices = await Invoice.findAll({
            attributes: [
                [sequelize.fn('EXTRACT', sequelize.literal('WEEK FROM "date"')), 'week'], // Extract week from date
                [sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM "date"')), 'year'],
                 // Extract year to avoid overlap of weeks across years
                 [sequelize.fn('DATE', sequelize.col('date')), 'date'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'invoiceCount'] // Sum of amounts for each week
            ],
            where: {
                date: {
                    [Op.between]: [threeMonthsAgo.toDate(), today.toDate()] // Filter to last three months
                }
            },
            group: ['year', 'week', 'date'], // Group by year and week
            order: [
                [sequelize.literal('EXTRACT(YEAR FROM "date")'), 'ASC'],
                [sequelize.literal('EXTRACT(WEEK FROM "date")'), 'ASC']
            ] // Order by year and week
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: weeklyInvoices
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch weekly revenue data.',
            error: error.message // Provide additional error details
        });
    }
});

// ARPU every month from the first data in DB
router.get('/metrics/arpu-monthly-growth', verifyToken, async (req, res) => {
    try {
        const arpuGrowth = await Invoice.findAll({
            attributes: [
                [sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM "date"')), 'year'], // Extract year from createdAt
                [sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "date"')), 'month'], // Extract month from createdAt
                [sequelize.fn('AVG', sequelize.col('amount')), 'averageRevenue'] // Average of amounts for each month
            ],
            group: ['year', 'month'], // Group by year and month
            order: [
                [sequelize.literal('EXTRACT(YEAR FROM "date")'), 'ASC'],
                [sequelize.literal('EXTRACT(MONTH FROM "date")'), 'ASC']
            ] // Order by year and month
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: arpuGrowth
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch monthly ARPU growth data.',
            error: error.message // Provide additional error details
        });
    }
});

// ARPU every week last 3 months
router.get('/metrics/arpu-weekly', verifyToken, async (req, res) => {
    try {
        // Get the current date and calculate the date three months ago
        const today = moment().startOf('day');
        const threeMonthsAgo = today.clone().subtract(3, 'months');

        // Find all invoices within the last three months and group by week
        const weeklyArpu = await Invoice.findAll({
            attributes: [
                [sequelize.fn('EXTRACT', sequelize.literal('WEEK FROM "date"')), 'week'], // Extract week from date
                [sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM "date"')), 'year'],
                 // Extract year to avoid overlap of weeks across years
                 [sequelize.fn('DATE', sequelize.col('date')), 'date'],
                [sequelize.fn('AVG', sequelize.col('amount')), 'averageArpu'] // Sum of amounts for each week
            ],
            where: {
                date: {
                    [Op.between]: [threeMonthsAgo.toDate(), today.toDate()] // Filter to last three months
                }
            },
            group: ['year', 'week', 'date'], // Group by year and week
            order: [
                [sequelize.literal('EXTRACT(YEAR FROM "date")'), 'ASC'],
                [sequelize.literal('EXTRACT(WEEK FROM "date")'), 'ASC']
            ] // Order by year and week
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: weeklyArpu
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Unable to fetch weekly revenue data.',
            error: error.message // Provide additional error details
        });
    }
});

// End queries

// get all deleted inactive users with the pagination - admin  ✅
router.get('/getdeletedusers', verifyToken, async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const { timeZone } = req.body; 
    try {
        const users = await User.findAll({
            where: { deletedAt: {
                [Op.not]: null
            } },
            order: [['createdAt', 'DESC']],
            limit: pageSize,
            offset: (page - 1) * pageSize
        });

        if(users.length === 0) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'Users not found'
            });
        }

        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        const formattedUsers = users.map(user => {
            return {
                ...user.toJSON(),
                createdAt: moment(user.createdAt).tz(selectedTimeZone).format(),
                updatedAt: moment(user.updatedAt).tz(selectedTimeZone).format(),
                deletedAt: moment(user.deletedAt).tz(selectedTimeZone).format(),
                resetTokenExpiry: moment(user.resetTokenExpiry).tz(selectedTimeZone).format()
            }
        })

        return res.status(200).json({
            status: 'success', 
            statusCode: 200,
            message: 'Users retrieved successfully.',
            users: formattedUsers
        });
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// Get all GitHub requests with optional userId filter and pagination
router.get('/github-requests', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const userId = req.query.userId;

    try {
        const whereClause = { deletedAt: null };

        if (userId) {
            whereClause.userId = userId;
        }

        const githubRequests = await GithubRequest.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            limit: pageSize,
            offset: (page - 1) * pageSize
        });

        if (githubRequests.length === 0) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'GitHub requests not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'GitHub requests retrieved successfully.',
            githubRequests
        });

    } catch (error) {
        console.error("An error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An error has occurred and we're working to fix the problem!"
        });
    }
});

// forgot password  ✅
router.post('/forgot-password', async(req, res) => {
    try {
        const { email, timeZone } = req.body;

        if(!email || email == '') {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'Email is required.'
            })
        }

        const user = await User.findOne({ where: { email } });

        if(!user) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This email doesn\'t exist.'
            })
        }

        if(user.deletedAt) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This user has been deleted.'
            })
        }

        const token = crypto.randomBytes(20).toString('hex');

        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        let expiryDate;

        expiryDate = moment().add(1, 'hour').tz(selectedTimeZone).format();

        // Calculate new expiry date: 1 hour from now
        user.resetToken = token;
        user.resetTokenExpiry = expiryDate;
        await user.save();

        // send email to the user with the reset link
        const resetLink = `http://localhost:3000/reset-password/${token}`;
        const mailOptions = {
            to: email,
            subject: 'Reset your password',
            text: `Click the following link to reset your password: ${resetLink}`
        };

        await sendPasswordResetEmail(email, resetLink, user.first_name);

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Reset password link sent successfully.',
            resetTokenExpiry: expiryDate
        });
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// reset password  ✅
router.post('/reset-password/:token', async(req, res) => {
    const token = req.params.token;
    const { timeZone, updatedAt } = req.body;
    try {
        
        const { newPassword, confirmPassword, timeZone } = req.body;

        if(newPassword == '' || confirmPassword == '') {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'New password and confirm password are required.'
            })
        }
    
        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        if(newPassword != confirmPassword) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'New password and confirm password does not match!'
            })
        }

        // find the user by the reset token and the expiry
        const user = await User.findOne({
            where: {
                resetToken: token,
                resetTokenExpiry: { [Op.gt]: moment().tz(selectedTimeZone).toDate() }
            }
        });


        // handle if the user cannot be find by the token and the expiry
        if(!user) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'Invalid or expired token.'
            })
        };

        if(user.deletedAt) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This user has been deleted.'
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);


        const resetTokenTimeZone = moment(user.resetTokenExpiry).tz(selectedTimeZone).format();

        const currentTime = moment().tz(selectedTimeZone); 

        console.log(resetTokenTimeZone);
        console.log('current: ', currentTime);


        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

        // response the success result
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Password reset successfully.',
            user,
            resetTokenExpiry: resetTokenTimeZone
        })

    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// get the user by id - timezone ✅
router.get('/:id', verifyToken, async(req, res) => {
    const userId = req.params.id;
    let { timeZone } = req.body;
    try {
        // let user = await User.findOne({ where: { id: userId }});

        let user = await User.findByPk(userId, {
            include: [Invoice],
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        })
        
        if(!user) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'User not found'
            })
        }

        if(user.deletedAt) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This user has been deleted.'
            })
        }

        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        const createdAtTimeZone = moment(user.createdAt).tz(selectedTimeZone).format();

        const updatedAtTimeZone = moment(user.updatedAt).tz(selectedTimeZone).format();

        const deletedAtTimeZone = moment(user.deletedAt).tz(selectedTimeZone).format();

        const resetTokenTimeZone = moment(user.resetTokenExpiry).tz(selectedTimeZone).format();
        
        // let resetTokenExpiryTimeZone = user.resetTokenExpiry;
        // if (timeZone) {
        //     resetTokenExpiryTimeZone = moment(user.resetTokenExpiry).tz(timeZone).format();
        // }

        // user.resetTokenExpiry = resetTokenTimeZone;


        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'User found successfully.',
            user,
            createdAt: createdAtTimeZone,
            updatedAt: updatedAtTimeZone,
            deletedAt: deletedAtTimeZone,
            resetTokenExpiry: resetTokenTimeZone
        })
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!",
        });
    }
});

// get user invoices
router.get('/:id/invoices', verifyToken, async(req, res) => {
    const userId = req.params.id;
    let { timeZone } = req.body;
    try {

        let user = await User.findByPk(userId, {
            include: [Invoice],
        });

        if(!user) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'User not found'
            })
        }

        if(user.deletedAt) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This user has been deleted.'
            })
        }

        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        const createdAtTimeZone = moment(user.invoices.createdAt).tz(selectedTimeZone).format();
        const updatedAtTimeZone = moment(user.invoices.updatedAt).tz(selectedTimeZone).format();
        const deletedAtTimeZone = moment(user.invoices.deletedAt).tz(selectedTimeZone).format();
        
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            createdAt: createdAtTimeZone,
            updatedAt: updatedAtTimeZone,
            deletedAt: deletedAtTimeZone,
            invoices: user.invoices
        })

    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!",
        });
    }
});

// get invoice by id
router.get('/:id/invoices/:invoiceId', async(req, res) => {
    const userId = req.params.id;
    const invoiceId = req.params.invoiceId;
    try {

        const user = await User.findByPk(userId);

        if(!user) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'User not found'
            })
        }

        if(user.deletedAt) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This user has been deleted.'
            })
        }

        const invoice = await Invoice.findByPk(invoiceId);

        if(!invoice) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'Invoice not found'
            })
        }

        if(invoice.deletedAt) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This invoice has been deleted.'
            })
        }

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Invoice found successfully.',
            invoice
        })

        
    } catch(error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: "An Error has occurred and we're working to fix the problem!",
        });
    }
})

// update firstname, lastname ✅
router.put('/:id', verifyToken, async(req, res) => {
    const { first_name, last_name, updatedAt, updatedBy, timeZone } = req.body;
    const userId = req.params.id;
    try {

        const user = await User.findByPk(userId);

        if(!user) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'User not found'
            })
        }

        if(user.deletedAt) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This user has been deleted.'
            })
        }

        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        const updatedAtTimeZone = moment(user.updatedAt).tz(selectedTimeZone).format();

        await user.update({
            first_name: first_name,
            last_name: last_name,
            updatedAt: updatedAtTimeZone,
            updatedBy,
        });

        await Notification.create({
            title: 'Profile Information',
            message: `Your first and last name have been successfully updated. Please review your profile to ensure all information is correct. If you did not make this change, contact our support team immediately.`,
            read: false,
            userId: userByEmail.id,
            createdAt: updatedAtTimeZone
        });


        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'User information updated successfully.',
            user,
            updatedAt: updatedAtTimeZone
        })
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
})

// delete the user - soft deletion - deletedAt, deletedBy - timezone ✅
router.delete('/:id', verifyToken, async(req, res) => {
    const userId = req.params.id;
    const { deletedAt, deletedBy, timeZone } = req.body;
    try {
        const user = await User.findByPk(userId);

        if(!user) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'User not found'
            })
        }

        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        const deletedAtTimeZone = moment().tz(selectedTimeZone).format();

        const deletedUser = await user.update({
            deletedAt: deletedAtTimeZone,
            deletedBy
        });

        return res.status(200).json({
            status: 'error',
            statusCode: 200,
            message: 'User deleted successfully',
            deletedUser,
            deletedAt: deletedAtTimeZone
        });
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
})

// Notification routes
// get all notifications for a specific user
router.get('/notifications/:userId', verifyToken, async (req, res) => {
    const userId = req.params.userId;
    try {
        // Fetch all notifications from the database
        const notifications = await Notification.findAll({
            where: { userId: req.params.userId },
            // include: [User],
            order: [['createdAt', 'DESC']]
        });

        if (!notifications || notifications.length === 0) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'No notifications found'
            });
        }

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Notifications retrieved successfully.',
            notifications
        });
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// get unread notifications count for a user
router.get('/notifications/unread/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.params.userId; // Corrected the assignment of userId

        // Fetch all unread notifications from the database
        const unreadNotifications = await Notification.findAll({
            where: { userId, read: false }
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Unread notifications count retrieved successfully.',
            count: unreadNotifications.length
        });
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

router.get('/notifications/recently/:userId', verifyToken, async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);  // Ensure it's a valid number

        if (isNaN(userId)) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'Invalid user ID'
            });
        }

        // Fetch the last 5 notifications for the user
        const notifications = await Notification.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
            limit: 5
        });

        if (!notifications || notifications.length === 0) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'No notifications found for the user'
            });
        }

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Notifications retrieved successfully.',
            notifications
        });
    } catch (error) {
        console.error("An error occurred: ", error.message);
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'An internal server error occurred'
        });
    }
});

// get a notification by id for a specific user
router.get('/notifications/:userId/:id', verifyToken, async (req, res) => {
    // const userId = req.body.userId;
    const notificationId = req.params.id;
    const userId = req.params.userId;
    try {
        // Fetch the notification from the database
        // const notification = await Notification.findByPk(notificationId, {
        //     include: [User]
        // });

        const notification = await Notification.findByPk(notificationId);

        if(notification.userId != userId) {
            return res.status(403).json({
                status: 'error',
                statusCode: 403,
                message: 'You are not authorized to view this notification.'
            });
        }

        if (!notification) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'Notification not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Notification retrieved successfully.',
            notification
        });
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// mark an notification as read
router.put('/notifications/marked/:id', verifyToken, async (req, res) => {
    const notificationId = req.params.id;
    try {
        // Fetch the notification from the database
        const notification = await Notification.findByPk(notificationId);

        if (!notification) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'Notification not found'
            });
        }

        // Mark the notification as read
        notification.read = true;
        await notification.save();

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Notification marked as read successfully.',
            notification
        });
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// END NOTIFICATION

// request github access
router.post('/github-request', async(req, res) => {
    const { userId, timeZone, email } = req.body; 
    try {

        if(!userId || !email || userId == '' || email == '') {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'Email is required'
            })
        }
        
        const user = await User.findByPk(userId);

        if(!user) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'User not found'
            })
        }

        if(user.deletedAt) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This user has been deleted.'
            })
        }

        if(!user.hasAccess) {
            return res.status(403).json({
                status: 'error',
                statusCode: 403,
                message: 'User does not have access to this feature.'
            })
        }

        const existingRequest = await GithubRequest.findOne({
            where: {
                userId: userId,
                status: ['pending','accepted'],
                deletedAt: null
            }
        });

        if(existingRequest) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'You have already made a request before. Please wait for the current request to be processed.'
            })
        }

        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        const createdAtTimeZone = moment().tz(selectedTimeZone).format();

        const githubRequest = await GithubRequest.create({
            email,
            status: 'pending',
            createdAt: createdAtTimeZone,
            userId: userId
        });

        await Notification.create({
            title: 'Access request received',
            message: `Thank you for your payment! We have received your request for Github access. Our team will review your request and get back to you shortly.`,
            read: false,
            userId: userId,
            createdAt: createdAtTimeZone
        });

        return res.status(201).json({
            status: 'success',
            statusCode: 201,
            message: 'Github request sent successfully.',
            githubRequest,
            createdAt: createdAtTimeZone
        });
        
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        console.log("ERROR: ", error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// get github request by id
router.get('/github-request/:id', async(req, res) => {
    const { id } = req.params.id;
    try {

        const githubRequest = await GithubRequest.findByPk(id);

        if(!githubRequest) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'Github request not found'
            })
        }

        if(githubRequest.deletedAt){
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This github request has been deleted.'
            })
        }

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Github request found successfully.',
            githubRequest
        })
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        console.log("ERROR: ", error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// update github request by id
router.put('/github-request/:id', async(req, res) => {
    const { id } = req.params.id;
    const { email, status, createdAt, createdBy, updatedAt, updatedBy, deletedAt, deletedBy, userId } = req.body;
    try {

        const githubRequest = await GithubRequest.findByPk(id);

        if(!githubRequest) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'Github request not found'
            })
        }

        if(githubRequest.deletedAt){
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This github request has been deleted.'
            })
        }

        const updatedGithubRequest = await githubRequest.update({
            email,
            status,
            createdAt,
            createdBy,
            updatedAt,
            updatedBy,
            deletedAt,
            deletedBy,
            userId
        });

        // if the status is pending and updated to accepted i need to create an notification for user
        if(githubRequest.status === 'pending' && updatedGithubRequest.status === 'accepted') {
            await Notification.create({
                title: 'Github Access Granted',
                message: `Congratulations! Your request for Github access has been approved. You can now access the Github feature.`,
                read: false,
                userId: userId,
                createdAt: updatedAt
            });
        }

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Github request updated successfully.',
            updatedGithubRequest
        })

    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        console.log("ERROR: ", error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// delete github request by id
router.delete('/github-request/:id', async(req, res) => {
    const { id } = req.params.id;
    const { userId } = req.body;
    try {
        const githubRequest = await GithubRequest.findByPk(id);

        if(!githubRequest) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'Github request not found'
            })
        }

        if(githubRequest.deletedAt){
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This github request has been deleted.'
            })
        }

        const deletedGithubRequest = await githubRequest.update({
            deletedAt: new Date(),
            deletedBy: userId
        });

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Github request deleted successfully.',
            deletedGithubRequest
        })

    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        console.log("ERROR: ", error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

// get all github requests with the pagination
// router.get('/github-requests', async(req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = parseInt(req.query.pageSize) || 5;
//     const userId = req.query.userId;
//     try {
//         const githubRequests = await GithubRequest.findAll({
//             where: { deletedAt: null },
//             order: [['createdAt', 'DESC']],
//             limit: pageSize,
//             offset: (page - 1) * pageSize
//         });

//         if(githubRequests.length === 0) {
//             return res.status(404).json({
//                 status: 'error',
//                 statusCode: 404,
//                 message: 'Github requests not found'
//             });
//         }

//         return res.status(200).json({
//             status: 'success',
//             statusCode: 200,
//             message: 'Github requests retrieved successfully.',
//             githubRequests
//         });

//     } catch (error) {
//         console.error("An Error has occurred and we're working to fix the problem!");
//         console.error(error);
//         console.log("ERROR: ", error);
//         res.status(500).json({
//             status: 'error',
//             statusCode: 500,
//             message: "An Error has occurred and we're working to fix the problem!"
//         });
//     }
// });


// get all deleted github requests with the pagination
router.get('/deleted-github-requests', async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    try {
        const githubRequests = await GithubRequest.findAll({
            where: { deletedAt: {
                [Op.not]: null
            } },
            order: [['createdAt', 'DESC']],
            limit: pageSize,
            offset: (page - 1) * pageSize
        });

        if(githubRequests.length === 0) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'Github requests not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Github requests retrieved successfully.',
            githubRequests
        });

    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        console.log("ERROR: ", error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});

module.exports = router;