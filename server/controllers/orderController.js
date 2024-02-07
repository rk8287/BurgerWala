const catchAsyncError = require('../middlewares/catchAsyncError');
const Order = require('../models/orderModel');



// Create new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
  
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
  
    res.status(201).json({
      success: true,
      order,
    });
  });


  exports.getOrderDetails = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name");
  
    if (!order) return next(new ErrorHandler("Invalid Order Id", 404));
  
    res.status(200).json({
      success: true,
      order,
    });
  });


exports.myOrder = catchAsyncError(async (req,res,next)=>{

    const orders = await Order.find({user: req.user._id});

    res.status(200).json({
        success: true,
        orders
    })

})