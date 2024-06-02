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
const { userValidationRules, validate } = require('../validators/validators');


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
router.post('/update-profile-picture/:id', async(req, res) => {
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
            // verification_token: verificationToken,
            createdAt: createdAtTimeZone
        });

        // await sendWelcomeEmail(email);

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
            // await sendVerificationEmail(email, verificationToken);
            await sendVerificationEmail(email, verificationToken);

            return res.status(403).json({
                status: 'error',
                statusCode: 403,
                message: 'Email not verified. Verification email sent.'
            });
        }

        // await User.create({ createdBy: createdBy })

       
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

// log out
router.post('/logout', async(req, res) => {
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

// verify email  ✅
router.get('/verify-email', async(req, res) => {
    const { token } = req.query;
    const { timeZone } = req.body;
    try {
        const decodedToken = jwt.verify(token, process.env.SECRETJWT);
        const { email } = decodedToken;

        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        const updatedAtTimeZone = moment().tz(selectedTimeZone);

        await User.update({ isVerify: true, updatedAt: updatedAtTimeZone }, { where: { email: email } });
    

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

// update all the fiedls - Admin ✅
router.put('/update-user/:id', async(req, res) => {
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

// get all users with the pagination - admin  ✅
router.get('/getall', async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const { timeZone } = req.body;
    try {
        const users = await User.findAll({
            where: { deletedAt: null },
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
})

// get all deleted inactive users with the pagination - admin  ✅
router.get('/getdeletedusers', async(req, res) => {
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
})

// forgot password  ✅
router.post('/forgot-password', async(req, res) => {
    try {
        const { email, timeZone } = req.body;

        const user = await User.findOne({ where: { email } });

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

        const token = crypto.randomBytes(20).toString('hex');

        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        let expiryDate;

        expiryDate = moment().add(1, 'hour').tz(selectedTimeZone).format();

        // Calculate new expiry date: 1 hour from now
        user.resetToken = token;
        user.resetTokenExpiry = expiryDate;
        await user.save();

        // send email to the user with the reset link
        const resetLink = `http://localhost:6099/api/users/reset-password/${token}`;
        const mailOptions = {
            to: email,
            subject: 'Reset your password',
            text: `Click the following link to reset your password: ${resetLink}`
        };

        await sendPasswordResetEmail(email, resetLink);

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

        const resetTokenTimeZone = moment(user.resetTokenExpiry).tz(selectedTimeZone).format();

        const currentTime = moment().tz(selectedTimeZone); 

        console.log(resetTokenTimeZone);
        console.log('current: ', currentTime);

        // if(resetTokenTimeZone.isBefore(currentTime)) {
        //     return res.status(400).json({
        //         status: 'error',
        //         statusCode: 400,
        //         message: 'Token expired, try again!'
        //     })
        // }

        // manually
        // if(resetTokenTimeZone.getTime() < currentTime.getTime()) {
        //     return res.status(400).json({
        //         status: 'error',
        //         statusCode: 400,
        //         message: 'Token expired, try again!'
        //     })
        // }

        user.password = newPassword;
        // user.resetToken = null;
        // user.resetTokenExpiry = null;
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
})

// change password ✅
router.put('/change-password/:id', async(req, res) => {
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

// get the user by id - timezone ✅
router.get('/:id', async(req, res) => {
    const userId = req.params.id;
    let { timeZone } = req.body;
    try {
        let user = await User.findOne({ where: { id: userId }});
        
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

// update firstname, lastname ✅
router.put('/:id', async(req, res) => {
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
router.delete('/:id', async(req, res) => {
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

module.exports = router;