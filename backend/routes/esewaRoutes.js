// routes/esewaRoutes.js
import express from "express";
import {
  initiateEsewaPayment,
  verifyEsewaPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

// POST /api/esewa/initiate
router.post("/initiate", initiateEsewaPayment);

// POST /api/esewa/verify
router.post("/verify", verifyEsewaPayment);

export default router;
