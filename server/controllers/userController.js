const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/User");
const cloudinary = require("cloudinary");
const sendToken = require("../utils/jwtToken");
const errorhander = require("../utils/errorHandler");




//Register User

exports.registerUser = catchAsyncError (async (req,res,next)=>{
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
    });
   
    sendToken(user,201,res)
});

//Login User


exports.loginUser = catchAsyncError(async (req,res,next)=>{

  const {email,password} = req.body;


  if(!email || !password){

    return next(new errorhander("Please enter email and password", 400))
  }

  const user = await User.findOne({ email }).select("+password");

  

  if(!user){
    return next(new errorhander("Invalid email or password", 401))
  }


  const isPasswordMatched = await user.comparePassword(password);

  if(!isPasswordMatched){

    return next(new errorhander("Invalid email or password", 401))
  }

  sendToken(user,201,res)


});

//Logout 

exports.logoutUser = catchAsyncError(async (req,res,next)=>{

  res.cookie("token",null,{

    expires: new Date(Date.now()),
    httpOnly: true
  })

  res.status(200).json({
    success: true,
    message: 'Logout Successfully'
  })

});


// Get User Detail

exports.getUserDetails = catchAsyncError(async(req,res,next)=>{

  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  })

});


// update User password


exports.updatePassword = (catchAsyncError(async (req,res,next)=>{

  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);


  if(!isPasswordMatched){
    return next(new errorhander("Old password is incorrect", 400))
  }

  if(req.body.newPassword !== req.body.confirmPassword){
    return next(new errorhander("password does not match", 400))
  }

  user.password = req.body.newPassword;

  await user.save();


  sendToken(user,'Password Updated Successfully!',200,res)

}))


//Update Profile

exports.updateProfile = catchAsyncError(async (req,res,next)=>{

  const newUserData = {

    name: req.body.name,
    email: req.body.email
  }

  if(req.body.avatar !== ''){

    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: 'Profile Update Successfully'
  });

  

})


