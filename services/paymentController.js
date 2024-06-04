const stripe = require('stripe')('sk_test_51PIUwIP1jRGQyMPGjV1eabWoEV50AcPDqY6vWUQh0I18zMjMaaJC8q2AJ5RApYeeNvawp20ukQkflGRwB4qB88st00tObSSLDc');
const User = require('../models/User');

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
    try {
        event = req.body;
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const userId = session.metadata.userId;
            const user = await User.findOne({ where: { id: userId } });
            if (user) {
                user.hasAccess = true;
                await user.save();
                console.log(`User ${user.email} has been granted access.`);
            }
        }
        res.json({ received: true });
    } catch (err) {
        console.error(`Error processing webhook: ${err}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
}

// tested in the postman and it works fine but i need to know how to deploy the webhook handler in the server


module.exports = { createCheckoutSession, handleWebhook };