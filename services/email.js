const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const mailgun = require('mailgun-js');

// Initialize Mailgun
const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});

const sendVerificationEmail = async (email, token) => {
    const mailOptions = {
        from: 'dijarsmakolli99@gmail.com', // replace with your mailgun verified sender
        to: email,
        bcc: 'dijarsmakolli50@gmail.com',
        subject: 'Verify your email address',
        html: `<p>Please click <a href="http://localhost:6099/verify-email?token=${token}">here</a> to verify your email address.</p>`
    };

    try {
        await mg.messages().send(mailOptions);
        console.log('Verification email sent successfully.');
    } catch (error) {
        console.log('error');
        throw error;
    }
};

const sendWelcomeEmail = async(email) => {
    const mailOptions = {
        from: 'dijarsmakolli99@gmail.com', // replace with your mailgun verified sender
        to: email,
        bcc: 'dijarsmakolli50@gmail.com',
        subject: 'Welcome to our application',
        html: `Thank you for signing up with us. We are excited to have you on board!`
    };

    try {

        await mg.messages().send(mailOptions);

    } catch(error) {
        console.log(error);
        console.error(error);
        throw error;
    }
};

const sendPasswordResetEmail = async (email, resetLink) => {
    const mailOptions = {
        from: 'dijarsmakolli99@gmail.com', // replace with your mailgun verified sender
        to: email,
        bcc: 'dijarsmakolli50@gmail.com',
        subject: 'Reset your password',
        html: `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`
    };

    try {
        await mg.messages().send(mailOptions);
        console.log('Password reset email sent successfully.');
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail };

// send the verification in the email ✅
// const sendVerificationEmail = async (email, token) => {
//     const mailOptions = {
//         from: 'dijarsmakolli99@gmail.com',
//         to: email,
//         bcc: 'dijarsmakolli50@gmail.com',
//         subject: 'Verify your email address',
//         html: `<p>Please click <a href="http://localhost:6099/verify-email?token=${token}">here</a> to verify your email address.</p>`
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Verification email sent successfully.');
//     } catch (error) {
//         console.error("An Error has occurred and we're working to fix the problem!");
//         console.error(error);
//         res.status(500).json({
//             status: 'error',
//             statusCode: 500,
//             message: "An Error has occurred and we're working to fix the problem!"
//         });
//     }
// };
