const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { handleWebhook } = require('../services/paymentController');

router.post('/webhook', bodyParser.raw({ type: 'application/json'}), handleWebhook);

module.exports = router;