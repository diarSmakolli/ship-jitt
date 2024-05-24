const stripe = require('stripe')('sk_test_51PIUwIP1jRGQyMPGjV1eabWoEV50AcPDqY6vWUQh0I18zMjMaaJC8q2AJ5RApYeeNvawp20ukQkflGRwB4qB88st00tObSSLDc');
const User = require('../models/User');

// paymentController.js

let pricingIds = ['price_1PIcjiP1jRGQyMPG1shY69it'];


// i created product in product catalog in stripe dashboard and got the price id and mode is one off payment
// i need to build the stripe integration payments for my new SaaS app which plan will be pay once an have access forever
// help me to write the code

// Sure! Here's a sample code for the paymentController.js file:


// const createCheckoutSession = async (req, res) => {
//     try {
//         const { priceId } = req.body;
//         // const user = await User.findOne({ where: { id: req.user.id } });
//         // if (!user) {
//         //     return res.status(404).json({ message: 'User not found' });
//         // }
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: [
//                 {
//                     price: priceId,
//                     quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//             success_url: `http://localhost:6099/success`,
//             cancel_url: `http://localhost:6099/cancel`,
//         });
//         res.json({ id: session.id, url: session.url });
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// how to test in postman this checkout session

// To test the checkout session in Postman, you can send a POST request to the endpoint that creates the checkout session.
// You can pass the priceId in the request body as follows:
// {
//     "priceId": "price_1PIcjiP1jRGQyMPG1shY69it"
// }
// After sending the request, you should receive a JSON response with the session ID and URL.


// i tested checkout session in postman generates the payment link in stripe checkout but now i need to implement and know which user pays and if payment successful to update the user in the database and give access in my protected routes but we just need to update the user.hasAccess to true
// how to do that

// To update the user in the database and give access to protected routes after a successful payment, you can handle the checkout.session.completed webhook event from Stripe.
// This event is triggered when a payment is successfully completed.
// You can create a webhook handler in your paymentController.js file to listen for this event and update the user in your database.

// yes i know procedure but how to know which user is paying and how to update the user in the database


// To know which user is paying, you can pass the user ID
// or any other identifier as metadata when creating the checkout session.
// You can then retrieve this metadata from the session object in the webhook handler.
// okay update the metadata in the checkout session and build the webhook handler in the paymentController.js file

// Sure! Here's an updated version of the paymentController.js file with the webhook handler:

// paymentController.js

// i think first we need to update the checkout session for metadata to pass what you mean works right

// Yes, you're correct. Before updating the webhook handler, you need to update the checkout session to include metadata.

// Here's how you can update the createCheckoutSession function to include metadata:

// paymentController.js

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
            success_url: `http://localhost:6099/success`,
            cancel_url: `http://localhost:6099/cancel`,
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


module.exports = { createCheckoutSession };