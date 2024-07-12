const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const mailgun = require('mailgun-js');
const nodemailer = require('nodemailer');
const path = require('path');

// Initialize Mailgun
const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});

// Initialize Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USEREMAIL,
        pass: process.env.PASSEMAIL
    },
    debug: true,
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
                console.log('error');
            } else {
                resolve(body);
                console.log('Verification email sent successfully.');
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

const sendCoupon = async(email, plan, amount, total, transactionId, date, status, currency, paymentMethod, paymentStatus) => {
    const starterPriceId = 'price_1PIcjiP1jRGQyMPG1shY69it';
    const allinPriceId = 'price_1PIZ7TP1jRGQyMPGkZlMPkmT';

    let planName;

    if(plan === starterPriceId) {
        planName = 'Starter plan';
    }

    if(plan === allinPriceId) {
        planName = 'All-in plan';
    }

    const data = {
        from: 'dijarsmakolli99@gmail.com',
        to: email,
        subject: 'Your order details in Ship Jitt',
        html: 
        // `
        // <p>Thank you for your purchase, here you have your order details</p>
        // <ul>
        //         <li>Plan: ${plan}</li>
        //         <li>Amount: ${amount}</li>
        //         <li>Total: ${total}</li>
        //         <li>Transaction ID: ${transactionId}</li>
        //         <li>Date: ${date}</li>
        //         <li>Status: ${status}</li>
        //         <li>Currency: ${currency}</li>
        //         <li>Payment method: ${paymentMethod}</li>
        //         <li>Payment status: ${paymentStatus}</li>
        //     </ul>
        // `
        `
            <p>Thanks</p>
        `
    };

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

// const sendInvoice = async ({
//     email, invoice, pdfFilePath
// }) => {
//     const data = {
//         from: 'dijarsmakolli99@gmail.com', // replace with your mailgun verified sender
//         to: email,
//         bcc: 'dijarsmakolli99@gmail.com',
//         subject: 'Your invoice',
//         text: `Please find your invoice attached`,
//         attachment: pdfFilePath
        
//     };

//     // lets build an promise
//     return new Promise((resolve, reject) => {
//         mg.messages().send(data, (error, body) => {
//             if(error) {
//                 reject(error);
//                 console.log(error);
//             } else {
//                 resolve(body);
//                 console.log('SUCCESFULLY SENT INVOICE');
//             }
//         })
//     })

// };

// const sendInvoice = async ({email}) => {
//     const mailOptions = {
//         from: 'dijarsmakolli99@gmail.com',
//         to: email,
//         subject: 'Your Invoice',
//         text: `Please find your invoice attached`
//     };

//     // lets build an promise
//     return new Promise((resolve, reject) => {
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 reject(error);
//                 console.log('ERRORRRRR!!!!!', error);
//             } else {
//                 resolve(info);
//                 console.log('SUCCESSS', info);
//             }
//         });
//     });

// };

// const sendInvoice = async (invoiceData) => {
//     const email = invoiceData.email;
//     const pdfPath = path.join(__dirname, '..', 'tmp', `${invoiceData.invoiceNumber}.pdf`);

//     // Generate PDF
//     await generateInvoicePDF(invoiceData, pdfPath);

//     const mailOptions = {
//         from: 'dijarsmakolli99@gmail.com',
//         to: email,
//         subject: 'Your Invoice',
//         text: `Please find your invoice attached.`,
//         attachments: [
//             {
//                 filename: `${invoiceData.invoiceNumber}.pdf`,
//                 path: pdfPath,
//                 contentType: 'application/pdf',
//             },
//         ],
//     };

//     return new Promise((resolve, reject) => {
//         transporter.sendMail(mailOptions, (error, info) => {
//             fs.unlinkSync(pdfPath); // Clean up the PDF file after sending the email
//             if (error) {
//                 reject(error);
//                 console.log('ERRORRRRR!!!!!', error);
//             } else {
//                 resolve(info);
//                 console.log('SUCCESSS', info);
//             }
//         });
//     });
// };

// const sendInvoice = async ({email, pdfPath}) => {

//     if (!fs.existsSync(pdfPath)) {
//         throw new Error(`PDF file not found at path: ${pdfPath}`);
//     }

//     const mailOptions = {
//         from: 'dijarsmakolli99@gmail.com',
//         to: email,
//         subject: 'Your Invoice',
//         text: 'Please find your invoice.',
//         attachments: [
//             {
//                 filename: path.basename(pdfPath),
//                 path: pdfPath
//             }
//         ]
//     };

//     console.log('Mail options:', mailOptions);


//     return new Promise((resolve, reject) => {
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 reject(error);
//                 console.log('Error: ', error);
//             } else {
//                 resolve(info);
//                 console.log('Success: ', info);
//             }
//         });
//     });
// };


const sendInvoice = async () => {
    try {
        // Check if the PDF file exists
        
        

        const mailOptions = {
            from: 'dijarsmakolli99@gmail.com',
            to: 'dijarsmakolli99@gmail.com',
            subject: 'Your Invoice',
            text: 'Please find your invoice attached.',
            attachments: [
                {
                    filename: 'invoice_No.AFLY14IV-0004.pdf',
                    path: path.join(__dirname, 'invoices', 'invoice_No.AFLY14IV-0004.pdf'), 
                    contentType: 'application/pdf'
                }
            ]
        };

        console.log('Mail options:', mailOptions);

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                    reject(error);
                } else {
                    console.log('Email sent successfully:', info);
                    resolve(info);
                }
            });
        });
    } catch (err) {
        console.error('Error in sendInvoice function:', err.message);
        throw err;
    }
};


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

module.exports = { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendPaymentDetailsEmail, sendCoupon, sendInvoice};