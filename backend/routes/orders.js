const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const cartService = require('../services/cartService');
const axios = require('axios');
require('dotenv').config();

// Get orders for user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  const orders = await Order.find({ user: userId });
  res.json(orders);
});

// Place order
router.post('/', async (req, res) => {
  const { userId, items, total, address, paymentMethod } = req.body;
  const order = new Order({ user: userId, items, total, address, paymentMethod });
  await order.save();
  // Clear the user's cart after order
  await cartService.clearCart(userId);
  res.status(201).json(order);
});

// eSewa payment initiation
router.post('/esewa/initiate', async (req, res) => {
  const { amount, productId, successUrl, failureUrl } = req.body;
  // Compose eSewa form data
  const formData = {
    amt: amount,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: amount,
    pid: productId,
    scd: process.env.MERCHANT_ID,
    su: successUrl,
    fu: failureUrl,
  };
  res.json({ formData, esewaUrl: process.env.ESEWAPAYMENT_URL });
});

// eSewa payment verification
router.post('/esewa/verify', async (req, res) => {
  const { amt, rid, pid } = req.body;
  try {
    const xml = `<paymentVerificationRequest><amt>${amt}</amt><scd>${process.env.MERCHANT_ID}</scd><pid>${pid}</pid><rid>${rid}</rid></paymentVerificationRequest>`;
    const response = await axios.post(
      process.env.ESEWAPAYMENT_STATUS_CHECK_URL,
      xml,
      { headers: { 'Content-Type': 'text/xml' } }
    );
    // Simple XML check for <response_code>Success</response_code>
    if (response.data.includes('<response_code>Success</response_code>')) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router; 