const User = require('../models/User');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { createCheckoutSession } = require('../services/paymentController');


// suggest the code or write the code for the paymentController.js
// Sure! Here's a sample code for the paymentController.js file:

router.post('/create-checkout-session', createCheckoutSession);
// router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);



module.exports = router;