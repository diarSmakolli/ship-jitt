const stripe = require('stripe')('sk_test_51PIUwIP1jRGQyMPGjV1eabWoEV50AcPDqY6vWUQh0I18zMjMaaJC8q2AJ5RApYeeNvawp20ukQkflGRwB4qB88st00tObSSLDc');
const User = require('../models/User');
const { sendWelcomeEmail, sendPaymentDetailsEmail, sendCoupon} = require('./email');

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

// paymentController.js

const handleWebhook = async (req, res) => {
    let event;
    let starterplan = 'price_1PIcjiP1jRGQyMPG1shY69it';
    let allinplan = 'price_1PIZ7TP1jRGQyMPGkZlMPkmT';
    try {
        event = req.body;
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const userId = session.metadata.userId;
            const priceId = session.metadata.priceId;
            const email = session.metadata.email;
            const amount = session.amount_total;
            const transactionId = session.id;
            const date = new Date(session.created * 1000).toLocaleString();

            const user = await User.findOne({ where: { id: userId } });
            if (user) {
                user.hasAccess = true;
                user.priceId = priceId; 
                await user.save();
                console.log(`User ${user.email} has been granted access.`);

                const paymentDetails = {
                    plan: priceId,
                    amount: (amount / 100).toFixed(2),
                    total: (amount / 100).toFixed(2),
                    transactionId: transactionId,
                    date: date
                };

                await sendCoupon(email, paymentDetails.plan, paymentDetails.amount, paymentDetails.total, paymentDetails.transactionId, paymentDetails.date);
                console.log(`Payment details email sent to ${email}`);
            }
        }

        res.json({ received: true });
    } catch (err) {
        console.error(`Error processing webhook: ${err}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
}

module.exports = { createCheckoutSession, handleWebhook };