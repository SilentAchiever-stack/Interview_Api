const Payment = require('../model/PaymentSchema');
const Order = require('../model/orderSchema');
const {StripeVerification, payStackVerification} = require('../Utils/paymentVerification')


const SavePayment = async(phoneId)=>{
    try{
    await Payment.create(phoneId)
    console.log(`this is the webhookId:${phoneId.eventId}`)
    return phoneId.eventId
    }catch (err) {
    if (err.code === 11000) {
      console.log(`Duplicate event ${paymentData.eventId}, already processed. Skipping.`);
      return;
    }
    throw err;
  }
};

const handleStripePaymentSuccess = async(event)=>{
    const obj = event.data.object
    await SavePayment({
    provider:'stripe',
    eventId:event.id,
    providerReference:obj.id,
    user:obj.metadata?.userId,
    order:obj.metadata?.orderId,
    currency:obj.currency,
    amount:obj.amount,
    status:'paid',
    rawEvent: event,
    });
    await Order.findByIdAndUpdate(obj.metadata?.orderId,{status:'paid'})
}

const handleStripePaymentFailed = async(event)=>{
    const obj = event.data.object
    await SavePayment({
    provider:'stripe',
    eventId:event.id,
    providerReference:obj.id,
    user:obj.metadata?.userId,
    order:obj.metadata?.orderId,
    currency:obj.currency,
    amount:obj.amount,
    status:'failed',
    rawEvent: event,
    });
    await Order.findByIdAndUpdate(obj.metadata?.orderId,{status:'payment_failed'})
}

const handleStripePaymentRefunded = async(event)=>{
    const obj = event.data.object
    await SavePayment({
    provider:'stripe',
    eventId:event.id,
    providerReference:obj.id,
    user:obj.metadata?.userId,
    order:obj.metadata?.orderId,
    currency:obj.currency,
    amount:obj.amount_refunded,
    status:'refunded',
    rawEvent: event,
    });
    await Order.findByIdAndUpdate(obj.metadata?.orderId,{status:'refunded'})
}

const handleStripePaymentChargedBack = async(event)=>{
    const obj = event.data.object
    await SavePayment({
    provider:'stripe',
    eventId:event.id,
    providerReference:obj.id,
    user:obj.metadata?.userId,
    order:obj.metadata?.orderId,
    currency:obj.currency,
    amount:obj.amount_refunded,
    status:'chargeback',
    rawEvent: event,
    });
    await Order.findByIdAndUpdate(obj.metadata?.orderId,{status:'chargeback'})
}
const stripeHandler = {
    'payment_intent.succeeded':handleStripePaymentSuccess,
    'payment_intent.payment_failed':handleStripePaymentFailed,
    'charge.refunded':handleStripePaymentRefunded,
    'charge.dispute.created':handleStripePaymentChargedBack
}

const handlePaystackSuccess = async(event)=>{
    const data = event.data;
    await SavePayment({
        provider:'paystack',
        eventId:event.id,
        providerreference:data.id?.toString() || data.reference,
        user:dataj.metadata?.userId,
        order:data.metadata?.orderId,
        currency:data.currency,
        amount:data.amount,
        status:'paid',
        rawEvent: event,
    })
      await Order.findByIdAndUpdate(obj.metadata?.orderId,{status:'paid'})
}

const handlePaystackFailed = async(event)=>{
    const data = event.data;
    await SavePayment({
        provider:'paystack',
        eventId:event.id,
        providerreference:data.id?.toString() || data.reference,
        user:dataj.metadata?.userId,
        order:data.metadata?.orderId,
        currency:data.currency,
        amount:data.amount,
        status:'failed',
        rawEvent: event,
    })
      await Order.findByIdAndUpdate(obj.metadata?.orderId,{status:'payment_failed'})
}


const handlePaystackRefunded = async(event)=>{
    const data = event.data;
    await SavePayment({
        provider:'paystack',
        eventId:event.id,
        providerreference:data.id?.toString() || data.reference,
        user:dataj.metadata?.userId,
        order:data.metadata?.orderId,
        currency:data.currency,
        amount:data.amount_refunded,
        status:'refunded',
        rawEvent: event,
    })
      await Order.findByIdAndUpdate(obj.metadata?.orderId,{status:'refunded'})
}

const handlePaystackChargeBack = async(event)=>{
    const data = event.data;
    await SavePayment({
        provider:'paystack',
        eventId:event.id,
        providerreference:data.id?.toString() || data.reference,
        user:dataj.metadata?.userId,
        order:data.metadata?.orderId,
        currency:data.currency,
        amount:data.amount,
        status:'charge',
        rawEvent: event,
    })
      await Order.findByIdAndUpdate(obj.metadata?.orderId,{status:'charge'})
}

const paystackHandlers ={
    'payment_intent.succeeded':handlePaystackSuccess,
    'payment_intent.payment_failed':handlePaystackFailed,
     'charge.refunded':handlePaystackRefunded,
     'charge.dispute':handlePaystackChargeBack
}


exports.handleStripeWebhook = async(req,res)=>{
    const{valid,event,error} = StripeVerification(req);
    if(!valid){
         return res.status(400).send(`Webhook Error: ${error}`);
    }
    res.status(200).json({ received: true });

    const handler = stripeHandler[event.type]
   if (!handler) {
    console.log(`Unhandled Stripe event type: ${event.type}`);
    return;
  }

  try {
    await handler(event);
  } catch (err) {
    console.error(`Error processing Stripe event ${event.type}:`, err);
  }
};

exports.handlePayStackWebhook = async (req, res) => {
  const { valid, event } = payStackVerification(req);

  if (!valid) {
    console.error('Paystack signature verification failed');
    return res.status(400).send('Invalid signature');
  }

  res.status(200).json({ received: true });

  const handler = paystackHandlers[event.type];

  if (!handler) {
    console.log(`Unhandled Paystack event: ${event.type}`);
    return;
  }

  try {
    await handler(event);
  } catch (err) {
    console.error(`Error processing Paystack event ${event.type}:`, err);
  }
};