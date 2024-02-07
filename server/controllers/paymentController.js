const catchAsyncError = require('../middlewares/catchAsyncError');
const stripe = require('stripe')('sk_test_51NMvo9SEWfiv1318l3tEcx4588FcDGhLvPQ89kMWNfo0n8fO4F524LnWYcz7lKaNJga3ubs7qPBjdMItQENN74Gd000jRfQoHs');


exports.processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "BCA BURGER WALA",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: 'pk_test_51NMvo9SEWfiv1318ADOGZCuTn3x4ruugBTh2w52zaPmhjk5NyAEVAJ7IoM4VnkCYsiluHjh6g999cTWuftuvnJZH00G4uBWonY' });
});