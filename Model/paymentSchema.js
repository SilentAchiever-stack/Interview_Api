/* const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    provider: { type: String, enum: ['stripe', 'paystack'], required: true },
    eventId: { type: String, required: true, unique: true },
    providerReference: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: {
      type: String,
      enum: ['success', 'failed', 'refunded', 'chargeback'],
      required: true,
    },
    rawEvent: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema); */
