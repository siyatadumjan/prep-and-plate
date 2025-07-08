
// controllers/esewaController.js
// controllers/esewaController.js
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const MERCHANT_CODE = process.env.ESEWA_MERCHANT_CODE;
const MERCHANT_SECRET = process.env.ESEWA_SECRET_KEY;
const PRODUCTION_ACTION_URL = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

if (!MERCHANT_CODE || !MERCHANT_SECRET) {
  console.error("❌ Missing ESEWA_MERCHANT_CODE or ESEWA_SECRET_KEY in .env");
  process.exit(1);
}

// Signature function using base64
function getSignature(secretKey, fields, values) {
  const message = fields.map(name => `${name}=${values[name]}`).join(',');
  return crypto.createHmac('sha256', secretKey).update(message).digest('base64');
}

export const initiateEsewaPayment = (req, res) => {
  const { amount, productId, successUrl, failureUrl } = req.body;

  if (!amount || !productId || !successUrl || !failureUrl) {
    return res.status(400).json({
      error: "Missing required fields: amount, productId, successUrl, failureUrl"
    });
  }

  const amt = parseFloat(amount).toFixed(2);

  const values = {
    amount: amt,
    tax_amount: "0",
    product_service_charge: "0",
    product_delivery_charge: "0",
    total_amount: amt,
    transaction_uuid: productId,
    product_code: MERCHANT_CODE,
    success_url: successUrl,
    failure_url: failureUrl,
  };

  const signed_field_names = ["total_amount", "transaction_uuid", "product_code"];
  const signature = getSignature(MERCHANT_SECRET, signed_field_names, values);

  const formHTML = `
    <html>
      <body onload="document.forms[0].submit()">
        <form method="POST" action="${PRODUCTION_ACTION_URL}">
          ${Object.entries(values)
            .map(([key, val]) => `<input type="hidden" name="${key}" value="${val}" />`)
            .join("\n")}
          <input type="hidden" name="signed_field_names" value="${signed_field_names.join(',')}" />
          <input type="hidden" name="signature" value="${signature}" />
          <noscript><button type="submit">Continue to eSewa</button></noscript>
        </form>
      </body>
    </html>
  `;

  res.send(formHTML);
};


export const verifyEsewaPayment = async (req, res) => {
  const { transaction_uuid, reference_id } = req.body;

  if (!transaction_uuid || !reference_id) {
    return res.status(400).json({ success: false, message: "Missing required parameters." });
  }

  try {
    const response = await axios.post(
      "https://rc-epay.esewa.com.np/api/epay/transaction/status",
      {
        transaction_uuid,
        reference_id,
        merchant_code: process.env.ESEWA_MERCHANT_CODE,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // eSewa returns { status: "COMPLETE", ... } on success
    if (response.data.status === "COMPLETE") {
      // Optionally update your order status in DB here

      return res.json({ success: true, details: response.data });
    } else {
      return res.json({ success: false, details: response.data });
    }
  } catch (error) {
    console.error("eSewa verify error:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Verification failed." });
  }
};;
