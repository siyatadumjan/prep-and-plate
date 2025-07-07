const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const cartService = require('../services/cartService');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');

// Get orders for user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  const orders = await Order.find({ user: userId });
  res.json(orders);
});

// Place order
router.post('/', async (req, res) => {
  const { userId, items, total, address, paymentMethod } = req.body;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  const orderId = `ORDER_${Date.now()}`;

  const order = new Order({
    user: userId,
    items,
    total,
    address,
    paymentMethod,
    orderId,
    status: 'pending'
  });

  await order.save();
  await cartService.clearCart(userId);
  res.status(201).json(order);
});

// Real EsewaPaymentGateway for integration
async function EsewaPaymentGateway(amount, tax, serviceCharge, deliveryCharge, productId, merchantId, secret, successUrl, failureUrl, esewaUrl) {
  // eSewa expects a POST with form data
  const formData = {
    amt: amount,
    psc: serviceCharge || 0,
    pdc: deliveryCharge || 0,
    txAmt: tax || 0,
    tAmt: amount + (serviceCharge || 0) + (deliveryCharge || 0) + (tax || 0),
    pid: productId,
    scd: merchantId,
    su: successUrl,
    fu: failureUrl,
  };
  // eSewa's test URL (use production URL for live)
  const url = esewaUrl || process.env.ESEWAPAYMENT_URL || 'https://uat.esewa.com.np/epay/main';
  // Return the form data and URL for the frontend to POST
  return {
    status: 200,
    request: {
      config: {
        data: formData
      }
    }
  };
}

// eSewa payment initiation (manual, not using esewajs)
router.post('/esewa/initiate', async (req, res) => {
  const { amount, productId } = req.body;
  try {
    const order = await Order.findById(productId);
    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }
    // Initiate payment
    const reqPayment = await EsewaPaymentGateway(
      amount, 0, 0, 0, productId,
      process.env.MERCHANT_ID,
      process.env.SECRET,
      process.env.SUCCESS_URL,
      process.env.FAILURE_URL,
      process.env.ESEWAPAYMENT_URL
    );
    if (!reqPayment || reqPayment.status !== 200) {
      return res.status(400).json({ message: 'Error sending data to eSewa' });
    }
    // Return form fields and URL for frontend to POST
    const formData = reqPayment.request.config.data;
    const esewaUrl = process.env.ESEWAPAYMENT_URL;
    return res.send({ formData, esewaUrl });
  } catch (error) {
    console.error("Esewa Initiate Error:", error);
    return res.status(400).json({ message: 'Error sending data to eSewa', error: error.message });
  }
});

// eSewa payment verification
router.post('/esewa/verify', async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await Order.findOne({ orderId });
    if (!order) return res.status(400).json({ message: 'Order not found' });

    const params = new URLSearchParams({
      amt: order.total,
      rid: orderId,
      pid: orderId,
      scd: process.env.MERCHANT_ID,
    });

    const verificationUrl = process.env.ESEWAPAYMENT_STATUS_CHECK_URL;

    const response = await axios.post(verificationUrl, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const xml = response.data;

    // Minimal XML parsing logic (real implementation should use xml2js or similar)
    if (xml.includes('<response_code>Success</response_code>')) {
      order.status = 'success';
      await order.save();
      return res.status(200).json({ message: 'Transaction successful', data: xml });
    } else {
      return res.status(400).json({ message: 'Transaction failed or pending', data: xml });
    }

  } catch (error) {
    console.error("Esewa Verify Error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
