const {createTransport} = require ('nodemailer');

exports.sendEmail = async(to,subject,text) =>{

    const transport = createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        auth: {
    user: process.env.SMPT_USER,
    pass: process.env.SMPT_PASS
  }
    });


    await transport.sendMail({
        to,
        subject,
        text,
        from:'adminId@gmail.com'
    });
};


