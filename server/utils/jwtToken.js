const sendToken = (user,statusCode,res)=>{

    const token = user.getJwtToken();

    //Options for cookie

    const Options = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24 * 60 *60*1000
        ),
        httpOnly:true
    }

    res.status(statusCode).cookie("token",token,Options).json({
        success:true,
        user,
        token
    })
}

module.exports = sendToken
