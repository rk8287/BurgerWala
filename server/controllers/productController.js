const catchAsyncError = require("../middlewares/catchAsyncError");
const Product = require('../models/productModel');
const cloudinary = require('cloudinary');
const ApiFeatures = require("../utils/apiFeatures");
const errorhander = require("../utils/errorHandler");

exports.createProduct = catchAsyncError(async (req, res, next) => {
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
  
    const product = await Product.create(req.body);
  
    res.status(201).json({
      success: true,
      product,
    });
  });


//Get all Products


exports.getAllProduct = catchAsyncError( async (req,res,next)=>{

  const resultPerPage = 8
  const productsCount = await Product.countDocuments();

 const apiFeature = new ApiFeatures(Product.find(),req.query)
 .search()
 .filter()
 .pagination(resultPerPage)

  const products = await apiFeature.query;
  res.status(200).json({
      success:true,
      products,
      productsCount,
      resultPerPage
  })
});


//Get Product Details

exports.getProductDetails = catchAsyncError( async (req,res,next)=>{
  const product = await Product.findById(req.params.id);

  if(!product){
     return next(new errorhander('Product not Found',404))
  }

  res.status(200).json({
      success:true,
      product
  })
});