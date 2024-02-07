const catchAsyncError = require ("../middlewares/catchAsyncError");
const errorhander = require ("../utils/errorHandler")
const { sendEmail } = require ("./sendMail");


exports.contact = catchAsyncError(async (req,res,next)=>{


    const {name,email,message} = req.body;

    if(!name,!email,!message) return next(new errorhander('Fill All Mandatory Filds',400))

    const to = process.env.MY_MAIL
    const subject = 'Contact form CourseBundler';

    const text = `I am ${name} and my emial is ${email} ${message}`

    await sendEmail(to,subject,text);

    res.status(200).json({
        success:true,
        message:'We Contact You Shortly'
    })

})