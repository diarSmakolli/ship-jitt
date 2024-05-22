const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook signature verification failed. ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const data = event.data;
    const eventType = event.type;

    try {
        if (eventType === 'checkout.session.completed') {
            const session = await stripe.checkout.sessions.retrieve(data.object.id, {
                expand: ['line_items']
            });
            const customerId = session.customer;
            const customer = await stripe.customers.retrieve(customerId);

            let user = await User.findOne({ email: customer.email });

            if (!user) {
                user = new User({
                    email: customer.email,
                    name: customer.name,
                    customerId,
                    hasAccess: true,
                    priceId: session.line_items.data[0].price.id
                });
            } else {
                user.hasAccess = true;
                user.priceId = session.line_items.data[0].price.id;
            }

            await user.save();
        }
    } catch (e) {
        console.error(`Stripe error: ${e.message} | Event type: ${eventType}`);
    }

    res.json({ received: true });
};

module.exports = {
    handleWebhook
};