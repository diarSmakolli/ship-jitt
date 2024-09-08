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

const sendWelcomeEmail = async(email) => {
    const data = {
        from: 'dijarsmakolli99@gmail.com',
        to: email,
        // bcc: 'dijarsmakolli99@gmail.com',
        subject: 'Welcome to ShipJitt',
        html: 
        `Thank you for signing up with us. We are excited to have you on board.`
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

}

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

const sendInvoice = async (email, invoiceNumber, invoiceDetails) => {

    let htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <title></title>
        <style type="text/css" rel="stylesheet" media="all">
        /* Base ------------------------------ */
        
        @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
        body {
          width: 100% !important;
          height: 100%;
          margin: 0;
          -webkit-text-size-adjust: none;
        }
        
        a {
          color: #3869D4;
        }
        
        a img {
          border: none;
        }
        
        td {
          word-break: break-word;
        }
        
        .preheader {
          display: none !important;
          visibility: hidden;
          mso-hide: all;
          font-size: 1px;
          line-height: 1px;
          max-height: 0;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
        }
        /* Type ------------------------------ */
        
        body,
        td,
        th {
          font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
        }
        
        h1 {
          margin-top: 0;
          color: #333333;
          font-size: 22px;
          font-weight: bold;
          text-align: left;
        }
        
        h2 {
          margin-top: 0;
          color: #333333;
          font-size: 16px;
          font-weight: bold;
          text-align: left;
        }
        
        h3 {
          margin-top: 0;
          color: #333333;
          font-size: 14px;
          font-weight: bold;
          text-align: left;
        }
        
        td,
        th {
          font-size: 16px;
        }
        
        p,
        ul,
        ol,
        blockquote {
          margin: .4em 0 1.1875em;
          font-size: 16px;
          line-height: 1.625;
        }
        
        p.sub {
          font-size: 13px;
        }
        /* Utilities ------------------------------ */
        
        .align-right {
          text-align: right;
        }
        
        .align-left {
          text-align: left;
        }
        
        .align-center {
          text-align: center;
        }
        
        .u-margin-bottom-none {
          margin-bottom: 0;
        }
        /* Buttons ------------------------------ */
        
        .button {
          background-color: #3869D4;
          border-top: 10px solid #3869D4;
          border-right: 18px solid #3869D4;
          border-bottom: 10px solid #3869D4;
          border-left: 18px solid #3869D4;
          display: inline-block;
          color: #FFF;
          text-decoration: none;
          border-radius: 3px;
          box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
          -webkit-text-size-adjust: none;
          box-sizing: border-box;
        }
        
        .button--green {
          background-color: #22BC66;
          border-top: 10px solid #22BC66;
          border-right: 18px solid #22BC66;
          border-bottom: 10px solid #22BC66;
          border-left: 18px solid #22BC66;
        }
        
        .button--red {
          background-color: #FF6136;
          border-top: 10px solid #FF6136;
          border-right: 18px solid #FF6136;
          border-bottom: 10px solid #FF6136;
          border-left: 18px solid #FF6136;
        }
        
        @media only screen and (max-width: 500px) {
          .button {
            width: 100% !important;
            text-align: center !important;
          }
        }
        /* Attribute list ------------------------------ */
        
        .attributes {
          margin: 0 0 21px;
        }
        
        .attributes_content {
          background-color: #F4F4F7;
          padding: 16px;
        }
        
        .attributes_item {
          padding: 0;
        }
        /* Related Items ------------------------------ */
        
        .related {
          width: 100%;
          margin: 0;
          padding: 25px 0 0 0;
          -premailer-width: 100%;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
        }
        
        .related_item {
          padding: 10px 0;
          color: #CBCCCF;
          font-size: 15px;
          line-height: 18px;
        }
        
        .related_item-title {
          display: block;
          margin: .5em 0 0;
        }
        
        .related_item-thumb {
          display: block;
          padding-bottom: 10px;
        }
        
        .related_heading {
          border-top: 1px solid #CBCCCF;
          text-align: center;
          padding: 25px 0 10px;
        }
        /* Discount Code ------------------------------ */
        
        .discount {
          width: 100%;
          margin: 0;
          padding: 24px;
          -premailer-width: 100%;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
          background-color: #F4F4F7;
          border: 2px dashed #CBCCCF;
        }
        
        .discount_heading {
          text-align: center;
        }
        
        .discount_body {
          text-align: center;
          font-size: 15px;
        }
        /* Social Icons ------------------------------ */
        
        .social {
          width: auto;
        }
        
        .social td {
          padding: 0;
          width: auto;
        }
        
        .social_icon {
          height: 20px;
          margin: 0 8px 10px 8px;
          padding: 0;
        }
        /* Data table ------------------------------ */
        
        .purchase {
          width: 100%;
          margin: 0;
          padding: 35px 0;
          -premailer-width: 100%;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
        }
        
        .purchase_content {
          width: 100%;
          margin: 0;
          padding: 25px 0 0 0;
          -premailer-width: 100%;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
        }
        
        .purchase_item {
          padding: 10px 0;
          color: #51545E;
          font-size: 15px;
          line-height: 18px;
        }
        
        .purchase_heading {
          padding-bottom: 8px;
          border-bottom: 1px solid #EAEAEC;
        }
        
        .purchase_heading p {
          margin: 0;
          color: #85878E;
          font-size: 12px;
        }
        
        .purchase_footer {
          padding-top: 15px;
          border-top: 1px solid #EAEAEC;
        }
        
        .purchase_total {
          margin: 0;
          text-align: right;
          font-weight: bold;
          color: #333333;
        }
        
        .purchase_total--label {
          padding: 0 15px 0 0;
        }
        
        body {
          background-color: #F2F4F6;
          color: #51545E;
        }
        
        p {
          color: #51545E;
        }
        
        .email-wrapper {
          width: 100%;
          margin: 0;
          padding: 0;
          -premailer-width: 100%;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
          background-color: #F2F4F6;
        }
        
        .email-content {
          width: 100%;
          margin: 0;
          padding: 0;
          -premailer-width: 100%;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
        }
        /* Masthead ----------------------- */
        
        .email-masthead {
          padding: 25px 0;
          text-align: center;
        }
        
        .email-masthead_logo {
          width: 94px;
        }
        
        .email-masthead_name {
          font-size: 16px;
          font-weight: bold;
          color: #A8AAAF;
          text-decoration: none;
          text-shadow: 0 1px 0 white;
        }
        /* Body ------------------------------ */
        
        .email-body {
          width: 100%;
          margin: 0;
          padding: 0;
          -premailer-width: 100%;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
        }
        
        .email-body_inner {
          width: 570px;
          margin: 0 auto;
          padding: 0;
          -premailer-width: 570px;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
          background-color: #FFFFFF;
        }
        
        .email-footer {
          width: 570px;
          margin: 0 auto;
          padding: 0;
          -premailer-width: 570px;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
          text-align: center;
        }
        
        .email-footer p {
          color: #A8AAAF;
        }
        
        .body-action {
          width: 100%;
          margin: 30px auto;
          padding: 0;
          -premailer-width: 100%;
          -premailer-cellpadding: 0;
          -premailer-cellspacing: 0;
          text-align: center;
        }
        
        .body-sub {
          margin-top: 25px;
          padding-top: 25px;
          border-top: 1px solid #EAEAEC;
        }
        
        .content-cell {
          padding: 45px;
        }
        /*Media Queries ------------------------------ */
        
        @media only screen and (max-width: 600px) {
          .email-body_inner,
          .email-footer {
            width: 100% !important;
          }
        }
        
        @media (prefers-color-scheme: dark) {
          body,
          .email-body,
          .email-body_inner,
          .email-content,
          .email-wrapper,
          .email-masthead,
          .email-footer {
            background-color: #333333 !important;
            color: #FFF !important;
          }
          p,
          ul,
          ol,
          blockquote,
          h1,
          h2,
          h3,
          span,
          .purchase_item {
            color: #FFF !important;
          }
          .attributes_content,
          .discount {
            background-color: #222 !important;
          }
          .email-masthead_name {
            text-shadow: none !important;
          }
        }
        
        :root {
          color-scheme: light dark;
          supported-color-schemes: light dark;
        }
        </style>
      </head>
      <body>
        <span class="preheader">This is a receipt for your recent purchase on ${invoiceDetails.date}. No payment is due with this receipt.</span>
        <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td align="center">
              <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td class="email-masthead">
                    <a href="http://localhost:3000/" class="f-fallback email-masthead_name" target='_blank'>
                    Ship Jitt
                  </a>
                  </td>
                </tr>
                <!-- Email Body -->
                <tr>
                  <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                    <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                      <!-- Body content -->
                      <tr>
                        <td class="content-cell">
                          <div class="f-fallback">
                            <h1>Receipt from Ship Jitt</h1>
                            <p>Thanks for using Ship-jitt. This email is the receipt for your purchase.</p>
                            <!-- Discount -->
                            <!--
                            <table class="discount" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                <td align="center">
                                  <h1 class="f-fallback discount_heading">10% off your next purchase!</h1>
                                  <p class="f-fallback discount_body">Thanks for your support! Here's a coupon for 10% off your next purchase if used by {{expiration_date}}.</p>
                                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                    <tr>
                                      <td align="center">
                                        <a href="http://example.com" class="f-fallback button button--green" target="_blank">Use this discount now...</a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                        -->
                            
                            <table class="purchase" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                <td>
                                  <h3>Invoice ${invoiceDetails.invoiceNumber}</h3></td>
                                <td>
                                  <h3 class="align-right">${invoiceDetails.date}</h3></td>
                              </tr>
    
                              <tr>
                                <td>
                                  <h3>Amount paid</h3></td>
                                <td>
                                  <h3 class="align-right">$${invoiceDetails.amount}</h3></td>
                              </tr>
    
                              <tr>
                                <td>
                                  <h3>Status</h3></td>
                                <td>
                                  <h3 class="align-right">${invoiceDetails.status.charAt(0).toUpperCase() + invoiceDetails.status.slice(1)}</h3></td>
                              </tr>
    
                              <tr>
                                <td>
                                  <h3>Payment method</h3></td>
                                <td>
                                  <h3 class="align-right">${invoiceDetails.paymentMethod.charAt(0).toUpperCase() + invoiceDetails.paymentMethod.slice(1)}</h3></td>
                              </tr>
    
                              <tr>
                                <td>
                                  <h3>Package name</h3></td>
                                <td>
                                  <h3 class="align-right">${invoiceDetails.planName} x 1</h3></td>
                              </tr>
    
                              <tr>
                                <td colspan="2">
                                  <table class="purchase_content" width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                      <th class="purchase_heading" align="left">
                                        <p class="f-fallback">Description</p>
                                      </th>
                                      <th class="purchase_heading" align="right">
                                        <p class="f-fallback">Amount</p>
                                      </th>
                                    </tr>
                                    
                                    <tr>
                                      <td width="80%" class="purchase_item"><span class="f-fallback">
                                        ${invoiceDetails.planName} x 1
                                      </span></td>
                                      <td class="align-right" width="20%" class="purchase_item"><span class="f-fallback">
                                        $${invoiceDetails.amount}
                                      </span></td>
                                    </tr>
    
                                    <tr>
                                      <td width="80%" class="purchase_footer" valign="middle">
                                        <p class="f-fallback purchase_total purchase_total--label">Amount charged</p>
                                      </td>
                                      <td width="20%" class="purchase_footer" valign="middle">
                                        <p class="f-fallback purchase_total">$${invoiceDetails.amount}</p>
                                      </td>
                                    </tr>
    
                                    
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <p>If you have any questions about this receipt, simply reply to this email or reach out to our <a href="mailto:dijarsmakolli99@gmail.com">support team</a> for help.</p>
    
                            <p>You can see the invoice in the attachments</p>
    
                            <p>Best Regards,
                              <br>The ShipJitt team</p>
                            <!-- Action -->
                            
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td class="content-cell" align="center">
                          <p class="f-fallback sub align-center">
                            Ship Jitt LLC
                            <br>10000
                            <br>Pristina, Kosovo
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
    try {        
        const mailOptions = {
            from: 'dijarsmakolli99@gmail.com',
            to: email,
            subject: `Your ShipJitt receipt #${invoiceDetails.invoiceNumber}`,
            html: htmlContent,
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

const sendFailedInvoice = async (email, invoiceNumber, invoiceDetails) => {

  let htmlContent = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      <title></title>
      <style type="text/css" rel="stylesheet" media="all">
      /* Base ------------------------------ */
      
      @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
      body {
        width: 100% !important;
        height: 100%;
        margin: 0;
        -webkit-text-size-adjust: none;
      }
      
      a {
        color: #3869D4;
      }
      
      a img {
        border: none;
      }
      
      td {
        word-break: break-word;
      }
      
      .preheader {
        display: none !important;
        visibility: hidden;
        mso-hide: all;
        font-size: 1px;
        line-height: 1px;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
      }
      /* Type ------------------------------ */
      
      body,
      td,
      th {
        font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
      }
      
      h1 {
        margin-top: 0;
        color: #333333;
        font-size: 22px;
        font-weight: bold;
        text-align: left;
      }
      
      h2 {
        margin-top: 0;
        color: #333333;
        font-size: 16px;
        font-weight: bold;
        text-align: left;
      }
      
      h3 {
        margin-top: 0;
        color: #333333;
        font-size: 14px;
        font-weight: bold;
        text-align: left;
      }
      
      td,
      th {
        font-size: 16px;
      }
      
      p,
      ul,
      ol,
      blockquote {
        margin: .4em 0 1.1875em;
        font-size: 16px;
        line-height: 1.625;
      }
      
      p.sub {
        font-size: 13px;
      }
      /* Utilities ------------------------------ */
      
      .align-right {
        text-align: right;
      }
      
      .align-left {
        text-align: left;
      }
      
      .align-center {
        text-align: center;
      }
      
      .u-margin-bottom-none {
        margin-bottom: 0;
      }
      /* Buttons ------------------------------ */
      
      .button {
        background-color: #3869D4;
        border-top: 10px solid #3869D4;
        border-right: 18px solid #3869D4;
        border-bottom: 10px solid #3869D4;
        border-left: 18px solid #3869D4;
        display: inline-block;
        color: #FFF;
        text-decoration: none;
        border-radius: 3px;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
        -webkit-text-size-adjust: none;
        box-sizing: border-box;
      }
      
      .button--green {
        background-color: #22BC66;
        border-top: 10px solid #22BC66;
        border-right: 18px solid #22BC66;
        border-bottom: 10px solid #22BC66;
        border-left: 18px solid #22BC66;
      }
      
      .button--red {
        background-color: #FF6136;
        border-top: 10px solid #FF6136;
        border-right: 18px solid #FF6136;
        border-bottom: 10px solid #FF6136;
        border-left: 18px solid #FF6136;
      }
      
      @media only screen and (max-width: 500px) {
        .button {
          width: 100% !important;
          text-align: center !important;
        }
      }
      /* Attribute list ------------------------------ */
      
      .attributes {
        margin: 0 0 21px;
      }
      
      .attributes_content {
        background-color: #F4F4F7;
        padding: 16px;
      }
      
      .attributes_item {
        padding: 0;
      }
      /* Related Items ------------------------------ */
      
      .related {
        width: 100%;
        margin: 0;
        padding: 25px 0 0 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }
      
      .related_item {
        padding: 10px 0;
        color: #CBCCCF;
        font-size: 15px;
        line-height: 18px;
      }
      
      .related_item-title {
        display: block;
        margin: .5em 0 0;
      }
      
      .related_item-thumb {
        display: block;
        padding-bottom: 10px;
      }
      
      .related_heading {
        border-top: 1px solid #CBCCCF;
        text-align: center;
        padding: 25px 0 10px;
      }
      /* Discount Code ------------------------------ */
      
      .discount {
        width: 100%;
        margin: 0;
        padding: 24px;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #F4F4F7;
        border: 2px dashed #CBCCCF;
      }
      
      .discount_heading {
        text-align: center;
      }
      
      .discount_body {
        text-align: center;
        font-size: 15px;
      }
      /* Social Icons ------------------------------ */
      
      .social {
        width: auto;
      }
      
      .social td {
        padding: 0;
        width: auto;
      }
      
      .social_icon {
        height: 20px;
        margin: 0 8px 10px 8px;
        padding: 0;
      }
      /* Data table ------------------------------ */
      
      .purchase {
        width: 100%;
        margin: 0;
        padding: 35px 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }
      
      .purchase_content {
        width: 100%;
        margin: 0;
        padding: 25px 0 0 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }
      
      .purchase_item {
        padding: 10px 0;
        color: #51545E;
        font-size: 15px;
        line-height: 18px;
      }
      
      .purchase_heading {
        padding-bottom: 8px;
        border-bottom: 1px solid #EAEAEC;
      }
      
      .purchase_heading p {
        margin: 0;
        color: #85878E;
        font-size: 12px;
      }
      
      .purchase_footer {
        padding-top: 15px;
        border-top: 1px solid #EAEAEC;
      }
      
      .purchase_total {
        margin: 0;
        text-align: right;
        font-weight: bold;
        color: #333333;
      }
      
      .purchase_total--label {
        padding: 0 15px 0 0;
      }
      
      body {
        background-color: #F2F4F6;
        color: #51545E;
      }
      
      p {
        color: #51545E;
      }
      
      .email-wrapper {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #F2F4F6;
      }
      
      .email-content {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }
      /* Masthead ----------------------- */
      
      .email-masthead {
        padding: 25px 0;
        text-align: center;
      }
      
      .email-masthead_logo {
        width: 94px;
      }
      
      .email-masthead_name {
        font-size: 16px;
        font-weight: bold;
        color: #A8AAAF;
        text-decoration: none;
        text-shadow: 0 1px 0 white;
      }
      /* Body ------------------------------ */
      
      .email-body {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }
      
      .email-body_inner {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        -premailer-width: 570px;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #FFFFFF;
      }
      
      .email-footer {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        -premailer-width: 570px;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        text-align: center;
      }
      
      .email-footer p {
        color: #A8AAAF;
      }
      
      .body-action {
        width: 100%;
        margin: 30px auto;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        text-align: center;
      }
      
      .body-sub {
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid #EAEAEC;
      }
      
      .content-cell {
        padding: 45px;
      }
      /*Media Queries ------------------------------ */
      
      @media only screen and (max-width: 600px) {
        .email-body_inner,
        .email-footer {
          width: 100% !important;
        }
      }
      
      @media (prefers-color-scheme: dark) {
        body,
        .email-body,
        .email-body_inner,
        .email-content,
        .email-wrapper,
        .email-masthead,
        .email-footer {
          background-color: #333333 !important;
          color: #FFF !important;
        }
        p,
        ul,
        ol,
        blockquote,
        h1,
        h2,
        h3,
        span,
        .purchase_item {
          color: #FFF !important;
        }
        .attributes_content,
        .discount {
          background-color: #222 !important;
        }
        .email-masthead_name {
          text-shadow: none !important;
        }
      }
      
      :root {
        color-scheme: light dark;
        supported-color-schemes: light dark;
      }
      </style>
    </head>
    <body>
      <span class="preheader">This is a receipt for your recent purchase on ${invoiceDetails.date}. No payment is due with this receipt.</span>
      <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center">
            <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td class="email-masthead">
                  <a href="http://localhost:3000/" class="f-fallback email-masthead_name" target='_blank'>
                  Ship Jitt
                </a>
                </td>
              </tr>
              <!-- Email Body -->
              <tr>
                <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                  <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                    <!-- Body content -->
                    <tr>
                      <td class="content-cell">
                        <div class="f-fallback">
                          <h1>Invoice from Ship Jitt</h1>
                          <p>We are reaching out to inform you that your recent payment attempt for invoice #${invoiceDetails.invoiceNumber} was unsuccessful. We have attached the invoice to this email for your reference.</p>
                          <!--
                          <table class="discount" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td align="center">
                                <h1 class="f-fallback discount_heading">10% off your next purchase!</h1>
                                <p class="f-fallback discount_body">Thanks for your support! Here's a coupon for 10% off your next purchase if used by {{expiration_date}}.</p>
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                  <tr>
                                    <td align="center">
                                      <a href="http://example.com" class="f-fallback button button--green" target="_blank">Use this discount now...</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                      -->
                          
                          <table class="purchase" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td>
                                <h3>Invoice ${invoiceDetails.invoiceNumber}</h3></td>
                              <td>
                                <h3 class="align-right">${invoiceDetails.date}</h3></td>
                            </tr>
  
                            <tr>
                              <td>
                                <h3>Amount</h3></td>
                              <td>
                                <h3 class="align-right">$${invoiceDetails.amount}</h3></td>
                            </tr>
  
                            <tr>
                              <td>
                                <h3>Status</h3></td>
                              <td>
                                <h3 class="align-right">${invoiceDetails.status.charAt(0).toUpperCase() + invoiceDetails.status.slice(1)}</h3></td>
                            </tr>
  
                            <tr>
                              <td>
                                <h3>Payment method</h3></td>
                              <td>
                                <h3 class="align-right">${invoiceDetails.paymentMethod.charAt(0).toUpperCase() + invoiceDetails.paymentMethod.slice(1)}</h3></td>
                            </tr>
  
                            <tr>
                              <td>
                                <h3>Package name</h3></td>
                              <td>
                                <h3 class="align-right">${invoiceDetails.planName} x 1</h3></td>
                            </tr>
  
                            <tr>
                              <td colspan="2">
                                <table class="purchase_content" width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <th class="purchase_heading" align="left">
                                      <p class="f-fallback">Description</p>
                                    </th>
                                    <th class="purchase_heading" align="right">
                                      <p class="f-fallback">Amount</p>
                                    </th>
                                  </tr>
                                  
                                  <tr>
                                    <td width="80%" class="purchase_item"><span class="f-fallback">
                                      ${invoiceDetails.planName} x 1
                                    </span></td>
                                    <td class="align-right" width="20%" class="purchase_item"><span class="f-fallback">
                                      $${invoiceDetails.amount}
                                    </span></td>
                                  </tr>
  
                                  <tr>
                                    <td width="80%" class="purchase_footer" valign="middle">
                                      <p class="f-fallback purchase_total purchase_total--label">Amount</p>
                                    </td>
                                    <td width="20%" class="purchase_footer" valign="middle">
                                      <p class="f-fallback purchase_total">$${invoiceDetails.amount}</p>
                                    </td>
                                  </tr>
  
                                  
                                </table>
                              </td>
                            </tr>
                          </table>

                          <p>
                            Please review the invoice and try processing the payment again at your earliest convenience. 
                            If you need any assistance or have any questions regarding the payment, feel free to reach out to our <a href="mailto:dijarsmakolli99@gmail.com">support team</a>.
                          </p>

                          <p>You can see the invoice in the attachments</p>
  
                          <p>Best Regards,
                            <br>The ShipJitt team</p>
                          <!-- Action -->
                          
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td class="content-cell" align="center">
                        <p class="f-fallback sub align-center">
                          Ship Jitt LLC
                          <br>10000
                          <br>Pristina, Kosovo
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
  try {        
      const mailOptions = {
          from: 'dijarsmakolli99@gmail.com',
          to: email,
          subject: `Your ShipJitt receipt #${invoiceDetails.invoiceNumber}`,  
          html: htmlContent,
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

// const sendPasswordResetEmail = async (email, resetLink) => {
//     const data = {
//         from: 'dijarsmakolli99@gmail.com', // replace with your mailgun verified sender
//         to: email,
//         bcc: 'dijarsmakolli99@gmail.com',
//         subject: 'Reset your password',
//         html: `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`
//     };

//     // try {
//     //     await mg.messages().send(mailOptions);
//     //     console.log('Password reset email sent successfully.');
//     // } catch (error) {
//     //     console.error(error);
//     //     throw error;
//     // }

//     return new Promise((resolve, reject) => {
//         mg.messages().send(data, (error, body) => {
//             if(error) {
//                 reject(error);
//             } else {
//                 resolve(body);
//             }
//         })
//     })

// };

const sendPasswordResetEmail = async (email, resetLink, first_name) => {

  let htmlContent = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      <title></title>
      <style type="text/css" rel="stylesheet" media="all">
      /* Base ------------------------------ */
      
      @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
      body {
        width: 100% !important;
        height: 100%;
        margin: 0;
        -webkit-text-size-adjust: none;
      }
      
      a {
        color: #3869D4;
      }
      
      a img {
        border: none;
      }
      
      td {
        word-break: break-word;
      }
      
      .preheader {
        display: none !important;
        visibility: hidden;
        mso-hide: all;
        font-size: 1px;
        line-height: 1px;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
      }
      /* Type ------------------------------ */
      
      body,
      td,
      th {
        font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
      }
      
      h1 {
        margin-top: 0;
        color: #333333;
        font-size: 22px;
        font-weight: bold;
        text-align: left;
      }
      
      h2 {
        margin-top: 0;
        color: #333333;
        font-size: 16px;
        font-weight: bold;
        text-align: left;
      }
      
      h3 {
        margin-top: 0;
        color: #333333;
        font-size: 14px;
        font-weight: bold;
        text-align: left;
      }
      
      td,
      th {
        font-size: 16px;
      }
      
      p,
      ul,
      ol,
      blockquote {
        margin: .4em 0 1.1875em;
        font-size: 16px;
        line-height: 1.625;
      }
      
      p.sub {
        font-size: 13px;
      }
      /* Utilities ------------------------------ */
      
      .align-right {
        text-align: right;
      }
      
      .align-left {
        text-align: left;
      }
      
      .align-center {
        text-align: center;
      }
      
      .u-margin-bottom-none {
        margin-bottom: 0;
      }
      /* Buttons ------------------------------ */
      
      .button {
        background-color: #3869D4;
        border-top: 10px solid #3869D4;
        border-right: 18px solid #3869D4;
        border-bottom: 10px solid #3869D4;
        border-left: 18px solid #3869D4;
        display: inline-block;
        color: #FFF;
        text-decoration: none;
        border-radius: 3px;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
        -webkit-text-size-adjust: none;
        box-sizing: border-box;
      }
      
      .button--green {
        background-color: #22BC66;
        border-top: 10px solid #22BC66;
        border-right: 18px solid #22BC66;
        border-bottom: 10px solid #22BC66;
        border-left: 18px solid #22BC66;
      }
      
      .button--red {
        background-color: #FF6136;
        border-top: 10px solid #FF6136;
        border-right: 18px solid #FF6136;
        border-bottom: 10px solid #FF6136;
        border-left: 18px solid #FF6136;
      }
      
      @media only screen and (max-width: 500px) {
        .button {
          width: 100% !important;
          text-align: center !important;
        }
      }
      /* Attribute list ------------------------------ */
      
      .attributes {
        margin: 0 0 21px;
      }
      
      .attributes_content {
        background-color: #F4F4F7;
        padding: 16px;
      }
      
      .attributes_item {
        padding: 0;
      }
      /* Related Items ------------------------------ */
      
      .related {
        width: 100%;
        margin: 0;
        padding: 25px 0 0 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }
      
      .related_item {
        padding: 10px 0;
        color: #CBCCCF;
        font-size: 15px;
        line-height: 18px;
      }
      
      .related_item-title {
        display: block;
        margin: .5em 0 0;
      }
      
      .related_item-thumb {
        display: block;
        padding-bottom: 10px;
      }
      
      .related_heading {
        border-top: 1px solid #CBCCCF;
        text-align: center;
        padding: 25px 0 10px;
      }
      /* Discount Code ------------------------------ */
      
      .discount {
        width: 100%;
        margin: 0;
        padding: 24px;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #F4F4F7;
        border: 2px dashed #CBCCCF;
      }
      
      .discount_heading {
        text-align: center;
      }
      
      .discount_body {
        text-align: center;
        font-size: 15px;
      }
      /* Social Icons ------------------------------ */
      
      .social {
        width: auto;
      }
      
      .social td {
        padding: 0;
        width: auto;
      }
      
      .social_icon {
        height: 20px;
        margin: 0 8px 10px 8px;
        padding: 0;
      }
      /* Data table ------------------------------ */
      
      .purchase {
        width: 100%;
        margin: 0;
        padding: 35px 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }
      
      .purchase_content {
        width: 100%;
        margin: 0;
        padding: 25px 0 0 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }
      
      .purchase_item {
        padding: 10px 0;
        color: #51545E;
        font-size: 15px;
        line-height: 18px;
      }
      
      .purchase_heading {
        padding-bottom: 8px;
        border-bottom: 1px solid #EAEAEC;
      }
      
      .purchase_heading p {
        margin: 0;
        color: #85878E;
        font-size: 12px;
      }
      
      .purchase_footer {
        padding-top: 15px;
        border-top: 1px solid #EAEAEC;
      }
      
      .purchase_total {
        margin: 0;
        text-align: right;
        font-weight: bold;
        color: #333333;
      }
      
      .purchase_total--label {
        padding: 0 15px 0 0;
      }
      
      body {
        background-color: #F2F4F6;
        color: #51545E;
      }
      
      p {
        color: #51545E;
      }
      
      .email-wrapper {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #F2F4F6;
      }
      
      .email-content {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }
      /* Masthead ----------------------- */
      
      .email-masthead {
        padding: 25px 0;
        text-align: center;
      }
      
      .email-masthead_logo {
        width: 94px;
      }
      
      .email-masthead_name {
        font-size: 16px;
        font-weight: bold;
        color: #A8AAAF;
        text-decoration: none;
        text-shadow: 0 1px 0 white;
      }
      /* Body ------------------------------ */
      
      .email-body {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }
      
      .email-body_inner {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        -premailer-width: 570px;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #FFFFFF;
      }
      
      .email-footer {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        -premailer-width: 570px;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        text-align: center;
      }
      
      .email-footer p {
        color: #A8AAAF;
      }
      
      .body-action {
        width: 100%;
        margin: 30px auto;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        text-align: center;
      }
      
      .body-sub {
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid #EAEAEC;
      }
      
      .content-cell {
        padding: 45px;
      }
      /*Media Queries ------------------------------ */
      
      @media only screen and (max-width: 600px) {
        .email-body_inner,
        .email-footer {
          width: 100% !important;
        }
      }
      
      @media (prefers-color-scheme: dark) {
        body,
        .email-body,
        .email-body_inner,
        .email-content,
        .email-wrapper,
        .email-masthead,
        .email-footer {
          background-color: #333333 !important;
          color: #FFF !important;
        }
        p,
        ul,
        ol,
        blockquote,
        h1,
        h2,
        h3,
        span,
        .purchase_item {
          color: #FFF !important;
        }
        .attributes_content,
        .discount {
          background-color: #222 !important;
        }
        .email-masthead_name {
          text-shadow: none !important;
        }
      }
      
      :root {
        color-scheme: light dark;
        supported-color-schemes: light dark;
      }
      </style>
    </head>
    <body>
      <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center">
            <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td class="email-masthead">
                  <a href="http://localhost:3000/" class="f-fallback email-masthead_name" target='_blank'>
                  Ship Jitt
                </a>
                </td>
              </tr>
              <!-- Email Body -->
              <tr>
                <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                  <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                    <!-- Body content -->
                    <tr>
                      <td class="content-cell">
                        <div class="f-fallback">
                          <h1>Hi ${first_name}</h1>
                          <p>You recently requested to reset your password for your account. Use the button below
                          to reset it. This password reset is only valid for 1 hour.</p>
                          <!-- Discount -->
                         
                          <a href="${resetLink}"><button class="button button--green">Reset your password</button></a>
                          
                          <p>If you did not request a password reset, please ignore this email or <a href="mailto:dijarsmakolli99@gmail.com">contact support team</a> if you have questions.
                           for help.</p>

                          
                           <p>If the button above does not work, you can also click on the following link to reset your password:</p>

                           <p>${resetLink}</p>
  
                          <p>Best Regards,
                            <br>The ShipJitt team</p>
                          
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td class="content-cell" align="center">
                        <p class="f-fallback sub align-center">
                          Ship Jitt LLC
                          <br>10000
                          <br>Pristina, Kosovo
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
  try {        
      const mailOptions = {
          from: 'dijarsmakolli99@gmail.com',
          to: email,
          subject: `Reset your password`,
          html: htmlContent,
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