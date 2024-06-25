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
    const data = {
        from: 'dijarsmakolli99@gmail.com', // replace with your mailgun verified sender
        to: email,
        bcc: 'dijarsmakolli99@gmail.com',
        subject: 'Verify your email address',
        html: `<p>Please click <a href="http://localhost:3000/verify-email?token=${token}">here</a> to verify your email address.</p>`
    };

    // try {
    //     await mg.messages().send(mailOptions);
    //     console.log('Verification email sent successfully.');
    // } catch (error) {
    //     console.log('error');
    //     throw error;
    // }

    // lets build an promise
    return new Promise((resolve, reject) => {
        mg.messages().send(data, (error, body) => {
            if(error) {
                reject(error);
            } else {
                resolve(body);
            }
        })
    })

};

const sendWelcomeEmail = async(email) => {
    const data = {
        from: 'dijarsmakolli99@gmail.com',
        to: email,
        // bcc: 'dijarsmakolli99@gmail.com',
        subject: 'Welcome to ShipJitt',
        html: 
        `Thank you for signing up with us. We are excited to have you on board.`
    }

    return new Promise((resolve,reject) => {
        mg.messages().send(data, (error, body) => {
            if(error) {
                reject(error);
            } else {
                resolve(body);
            }
        })
    });

}

const sendCoupon = async(email, plan, amount, total, transactionId, date) => {
    const data = {
        from: 'dijarsmakolli99@gmail.com',
        to: email,
        // bcc: 'dijarsmakolli99@gmail.com',
        subject: 'Thank you for your purchase!',
        html: 
        `
        <p>Thank you for your purchase. Here is a coupon code for your next purchase:</p>
        <ul>
                <li>Plan: ${plan}</li>
                <li>Amount: ${amount}</li>
                <li>Total: ${total}</li>
                <li>Transaction ID: ${transactionId}</li>
                <li>Date: ${date}</li>
            </ul>
        `
    }
}

const sendPasswordResetEmail = async (email, resetLink) => {
    const data = {
        from: 'dijarsmakolli99@gmail.com', // replace with your mailgun verified sender
        to: email,
        bcc: 'dijarsmakolli99@gmail.com',
        subject: 'Reset your password',
        html: `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`
    };

    // try {
    //     await mg.messages().send(mailOptions);
    //     console.log('Password reset email sent successfully.');
    // } catch (error) {
    //     console.error(error);
    //     throw error;
    // }

    return new Promise((resolve, reject) => {
        mg.messages().send(data, (error, body) => {
            if(error) {
                reject(error);
            } else {
                resolve(body);
            }
        })
    })

};

const sendPaymentDetailsEmail = async (email, paymentDetails) => {
    const { plan, amount, total, transactionId, date } = paymentDetails;
    const data = {
        from: 'dijarsmakolli99@gmail.com', // replace with your mailgun verified sender
        to: email,
        bcc: 'dijarsmakolli99@gmail.com',
        subject: 'Your Payment Details',
        html: `
            <p>Thank you for your payment. Here are your payment details:</p>
            <ul>
                <li>Plan: ${plan}</li>
                <li>Amount: ${amount}</li>
                <li>Total: ${total}</li>
                <li>Transaction ID: ${transactionId}</li>
                <li>Date: ${date}</li>
            </ul>
        `
    };

    return new Promise((resolve, reject) => {
        mg.messages().send(data, (error, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
};

module.exports = { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendPaymentDetailsEmail, sendCoupon};