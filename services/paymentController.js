const stripe = require('stripe')('sk_test_51PIUwIP1jRGQyMPGjV1eabWoEV50AcPDqY6vWUQh0I18zMjMaaJC8q2AJ5RApYeeNvawp20ukQkflGRwB4qB88st00tObSSLDc');
const { Invoice } = require('../models');
const path = require('path');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const moment = require('moment-timezone');
const { sendInvoice, sendFailedInvoice } = require('./email');
const { generateInvoicePDF } = require('./generateInvoicePdf');

const createCheckoutSession = async (req, res) => {
    try {
        const { priceId, userId, email } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            customer_email: email,
            metadata: {
                userId: userId,
                email: email,
                priceId: priceId,
            },
            payment_intent_data: {
                metadata: {
                    userId: userId,
                    email: email,
                    priceId: priceId,
                }
            },
            discounts: [{ coupon: 'cMssEREn' }],
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000/cancel`,
        });
        res.json({ id: session.id, url: session.url, userId: userId, priceId: priceId });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// After updating the createCheckoutSession function, you can now pass the user ID and email as metadata when creating the checkout session.

// Now, let's update the webhook handler to listen for the checkout.session.completed event and update the user in the database:
const handleWebhook = async (req, res) => {
    let event;
    let starterplan = 'price_1PwYd9P1jRGQyMPGrB1ZTMNG';
    let allinplan = 'price_1PIZ7TP1jRGQyMPGkZlMPkmT';
    try {
        event = req.body;
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object; // session object from stripe
            const userId = session.metadata.userId; // userID
            const priceId = session.metadata.priceId; // priceID
            const email = session.metadata.email; // email
            const amount = session.amount_total; // 200
            const transactionId = session.id; // transactionID
            const date = new Date(session.created * 1000).toLocaleString();
            const status = session.status; // complete
            const currency = session.currency; // usd
            const paymentMethod = session.payment_method_types[0]; // card
            const paymentStatus = session.payment_status; // paid
            const country = session.customer_details.address.country; // XK
            const amountSubTotal = session.amount_subtotal; // 24900
            const amountTotal = session.amount_total; // 14900
            const discountAmount = amountSubTotal - amountTotal; // 10000

            
            console.log('Session: ', session);

            const user = await User.findOne({ where: { id: userId } });
            if (user) {
                user.hasAccess = true;
                // user.priceId = priceId;
                await user.save();
                console.log(`User ${user.email} has been granted access.`);

                const prefix = 'No.AF';
                const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
                const sequentialNumber = (await Invoice.count()) + 1;
                const invoiceNumber = `${prefix}${randomString}-${sequentialNumber.toString().padStart(4, '0')}`;

                const firstName = user.first_name;
                const lastName = user.last_name;

                const invoiceDetails = {
                    amount: (amount / 100).toFixed(2),
                    transactionId: transactionId,
                    date: date,
                    status: status,
                    currency: currency,
                    paymentMethod: paymentMethod,
                    paymentStatus: paymentStatus,
                    createdAt: moment().tz(process.env.DEFAULT_TIMEZONE).format(),
                    createdBy: userId,
                    userId: userId,
                    priceId: priceId,
                    planName: priceId == starterplan ? 'Starter pack' : 'Premium pack',
                    invoiceNumber: invoiceNumber,
                    customerName: `${firstName} ${lastName}`,
                    email: email,
                    country: country,
                    amountSubTotal: (amountSubTotal / 100).toFixed(2),
                    amountTotal: (amountTotal / 100).toFixed(2),
                    discountAmount: (discountAmount / 100).toFixed(2),
                    // balance_transaction: balance_transaction,
                    // creditCardBrand: creditCardBrand,
                    // paid: paid,
                    // last4Digits: last4Digits
                };

                // await generateInvoicePDF(invoiceDetails);

                generateInvoicePDF(invoiceDetails);

                await Invoice.create(invoiceDetails);

                sendInvoice(email, invoiceNumber, invoiceDetails);

                console.log(`Invoice ${invoiceNumber} has been sent to ${email}.`);

                console.log(session);
            }
        }

        if (event.type == 'charge.failed') {
            const session = event.data.object;
            const userId = session.metadata.userId;
            const priceId = session.metadata.priceId;
            const email = session.metadata.email;
            const date = new Date(session.created * 1000).toLocaleString(); // date
            const currency = session.currency; // USD
            const amount = session.amount; // 14900
            const status = session.status; // failed
            const country = session.billing_details.address.country; // XK
            const paymentMethod = session.payment_method_details.type; // card
            const paymentStatus = session.paid; // false

            const user = await User.findOne({ where: { id: userId } });

            if (user) {
                user.hasAccess = true;
                await user.save();
                console.log(`User ${user.email} has been granted access.`);

                const prefix = 'No.AF';
                const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
                const sequentialNumber = (await Invoice.count()) + 1;
                const invoiceNumber = `${prefix}${randomString}-${sequentialNumber.toString().padStart(4, '0')}`;

                const firstName = user.first_name;
                const lastName = user.last_name;

                const invoiceDetails = {
                    amount: (amount / 100).toFixed(2),
                    date: date,
                    status: status,
                    currency: currency,
                    paymentMethod: paymentMethod,
                    paymentStatus: paymentStatus ? 'paid' : 'fail',
                    createdAt: moment().tz(process.env.DEFAULT_TIMEZONE).format(),
                    createdBy: userId,
                    userId: userId,
                    priceId: priceId,
                    planName: priceId == starterplan ? 'Starter Plan' : 'All-in Plan',
                    invoiceNumber: invoiceNumber,
                    customerName: `${firstName} ${lastName}`,
                    email: email,
                    country: country,
                };

                generateInvoicePDF(invoiceDetails);

                await Invoice.create(invoiceDetails);
                
                sendFailedInvoice(email, invoiceNumber, invoiceDetails);

                console.log('Invoice pdf generated no payment made.');

                console.log(session);
            }
        }

        // if(event.type = 'checkout.session.expires') {
        //     const session = event.data.object;
        // }

        

        res.json({ received: true });
    } catch (err) {
        console.error(`Error processing webhook: ${err}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        console.log(err);
    }
}


module.exports = { createCheckoutSession, handleWebhook };