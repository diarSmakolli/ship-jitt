const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const mailgun = require('mailgun-js');
const nodemailer = require('nodemailer');
const path = require('path');
const welcomeTemplate = require('./templates/welcomeTemplate');
const verifyTemplate = require('./templates/verifyTemplate');
const invoiceTemplate = require('./templates/invoiceTemplate');
const failedInvoiceTemplate = require('./templates/failedInvoiceTemplate');
const resetPasswordTemplate = require('./templates/resetPasswordTemplate');

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

// verify email template done.
const sendVerificationEmail = async (email, token, first_name) => {
    const data = {
        from: 'dijarsmakolli99@gmail.com', // replace with your ma  ilgun verified sender
        to: email,
        subject: 'Verify your email address',
        html: verifyTemplate(email, token, first_name)
    };  

    // try {
    //     await mg.messages().send(mailOptions);
    //     console.log('Verification email sent successfully.');
    // } catch (error) {
    //     console.log('error');
    //     throw error;
    // }

    // lets build an promise
    // return new Promise((resolve, reject) => {
    //     mg.messages().send(data, (error, body) => {
    //         if(error) {
    //             reject(error);
    //             console.log('error');
    //         } else {
    //             resolve(body);
    //             console.log('Verification email sent successfully.');
    //         }
    //     })
    // })

    return new Promise((resolve, reject) => {
      transporter.sendMail(data, (error, body) => {
          if(error) {
              reject(error);
              console.log('error', error);
          } else {
              resolve(body);
              console.log('Email sent successfully');
          }
      })
  })

};

// Welcome email template done.
const sendWelcomeEmail = async(email, first_name) => {
    const data = {
        from: 'dijarsmakolli99@gmail.com',
        to: email,
        // bcc: 'dijarsmakolli99@gmail.com',
        subject: 'Welcome to ShipJitt',
        html: welcomeTemplate(first_name)
    }

    // return new Promise((resolve,reject) => {
    //     mg.messages().send(data, (error, body) => {
    //         if(error) {
    //             reject(error);
    //         } else {
    //             resolve(body);
    //         }
    //     })
    // });

    return new Promise((resolve, reject) => {
      transporter.sendMail(data, (error, body) => {
          if(error) {
              reject(error);
              console.log('error', error);
          } else {
              resolve(body);
              console.log('Email sent successfully');
          }
      })
  })

};

// send coupon email template not done yet
const sendCoupon = async(email, plan, amount, total, transactionId, date, status, currency, paymentMethod, paymentStatus) => {
    const starterPriceId = 'price_1PwYx1P1jRGQyMPGbDhde91U';
    const allinPriceId = 'price_1PwYxxP1jRGQyMPGHpjvqKD6';

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

// send Invoice email template dot done yet
const sendInvoice = async (email, invoiceNumber, invoiceDetails) => {
    try {        
        const mailOptions = {
            from: 'dijarsmakolli99@gmail.com',
            to: email,
            subject: `Your ShipJitt receipt #${invoiceDetails.invoiceNumber}`,
            html: invoiceTemplate(invoiceNumber, invoiceDetails),
            // attachments: [
            //     {
            //         filename: 'invoice_No.AFLY14IV-0004.pdf',
            //         path: path.join(__dirname, 'invoices', 'invoice_No.AFLY14IV-0004.pdf'), 
            //         contentType: 'application/pdf'
            //     }
            // ]

            attachments: [
                {
                    filename: `invoice_${invoiceNumber}.pdf`,
                    path: path.join(__dirname, 'invoices', `invoice_${invoiceNumber}.pdf`), 
                    contentType: 'application/pdf'
                }
            ]
        };

        console.log('Mail options:', mailOptions);

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, body) => {
                if(error) {
                    reject(error);
                    console.log('error', error);
                } else {
                    resolve(body);
                    console.log('Email sent successfully');
                }
            })
        })
    } catch (err) {
        console.error('Error in sendInvoice function:', err.message);
        throw err;
    }
};

// send failed email template not done yet 
const sendFailedInvoice = async (email, invoiceNumber, invoiceDetails) => {
  try {        
      const mailOptions = {
          from: 'dijarsmakolli99@gmail.com',
          to: email,
          subject: `Your ShipJitt Invoice #${invoiceNumber}`,  
          html: failedInvoiceTemplate(invoiceNumber, invoiceDetails),
          // attachments: [
          //     {
          //         filename: 'invoice_No.AFLY14IV-0004.pdf',
          //         path: path.join(__dirname, 'invoices', 'invoice_No.AFLY14IV-0004.pdf'), 
          //         contentType: 'application/pdf'
          //     }
          // ]

          attachments: [
              {
                  filename: `invoice_${invoiceNumber}.pdf`,
                  path: path.join(__dirname, 'invoices', `invoice_${invoiceNumber}.pdf`), 
                  contentType: 'application/pdf'
              }
          ]
      };

      console.log('Mail options:', mailOptions);

      return new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, (error, body) => {
              if(error) {
                  reject(error);
                  console.log('error', error);
              } else {
                  resolve(body);
                  console.log('Email sent successfully');
              }
          })
      })
  } catch (err) {
      console.error('Error in sendInvoice function:', err.message);
      throw err;
  }
};

// sendpasswordreset email template not done yet
const sendPasswordResetEmail = async (email, resetLink, first_name) => {
  try {        
      const mailOptions = {
          from: 'dijarsmakolli99@gmail.com',
          to: email,
          subject: `Reset your password`,
          html: resetPasswordTemplate(resetLink, first_name),
      };

      console.log('Mail options:', mailOptions);

      return new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, (error, body) => {
              if(error) {
                  reject(error);
                  console.log('error', error);
              } else {
                  resolve(body);
                  console.log('Email sent successfully');
              }
          })
      })
  } catch (err) {
      console.error('Error in sendInvoice function:', err.message);
      throw err;
  }
};

// sendpasswordreset email template not done yet
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

module.exports = { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendPaymentDetailsEmail, sendCoupon, sendInvoice, sendFailedInvoice};