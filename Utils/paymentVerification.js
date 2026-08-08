const crypto = require('crypto');
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const StripeVerification = async (req) => {
  const signature = req.headers['stripe-signature'];
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    return { valid: true, event };
  } catch (err) {
    return { valid: false, error: err.message };
  }
};

const payStackVerification = async (req) => {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(req.body)
    .digest('hex');

  const signature = req.headers['x-paystack-signature'];
  const valid = hash === signature;

  return { valid, event: valid ? JSON.parse(req.body) : null };
};

module.exports = { StripeVerification, payStackVerification };