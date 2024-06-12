const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async(req, res, next) => {
    try {   
        const token = req.cookies['token'];

        if(!token) {
            return res.status(401).json({
                status: 'error', 
                statusCode: 401,
                message: 'Token missing.'
            });
        }


        // const decoded = jwt.verify(token, process.env.SECRETJWT);

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRETJWT);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    status: 'error',
                    statusCode: 401,
                    message: 'Token has expired.'
                });
            } else {
                return res.status(401).json({
                    status: 'error',
                    statusCode: 401,
                    message: 'Token is invalid.'
                });
            }
        }

        if(!decoded) {
            return res.status(401).json({
                status: 'error',
                statusCode: 401,
                message: 'Token is invalid.'
            })
        }

        const user = await User.findOne({ id: decoded.id });

        if(!user) {
            res.status(401).json({
                status: 'error',
                statusCode: 401,
                message: 'User not found'
            })
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
};

const isVerified = (req, res, next) => {
    const user = req.user;
    console.log("User:", user);
    if (!user.isVerify) {
        return res.status(403).json({
            status: 'error',
            statusCode: 403,
            message: 'Email not verified. Please verify your email.'
        });
    }
    next();
};

const hasAccess = (req, res, next) => {
    const user = req.user;
    console.log("User", user);
    if(!user.hasAccess) {
        return res.status(401).json({
            status: 'error',
            statusCode: 401,
            message: 'You didnt have the premium plan, please buy the packet to have access in the application.'
        })
    }
    next();
};

const isAdmin = (req, res, next) => {
    const user = req.user;
    console.log('User', user);
    if(!user.isAdmin) {
        return res.status(401).json({
            status: 'error',
            statusCode: 401,
            message: 'You does not authorize to access in this route.'
        })
    }

    next();
};

const isPaid = (req, res,next) => {
    const user = req.user;
    
    // we need to handle if isPaid is true

    if(!user.isPaid) {
        return res.status(401).json({
            status: 'error',
            statusCode: 401,
            message: 'You didnt have the premium plan, please buy the packet to have access in the application.'
        })
    }
    
    next();
};


module.exports = {verifyToken, isVerified, isPaid, hasAccess, isAdmin};