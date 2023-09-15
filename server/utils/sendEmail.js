import nodemailer from 'nodemailer';



//gmail per work ni kar raha chalo bad me dekhenge

export const sendEmail=async (options)=>{
try{
    const transporter=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        }
    });
    const mailOptions={
        from:process.env.SMTP_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,

    };
    await transporter.sendMail(mailOptions);

}catch(err){

}

}