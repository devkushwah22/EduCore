const nodemailer = require("nodemailer");

// why we are using email, title, body as parameters?
// We are using email, title, and body as parameters because we want to send an email to the user with the given email address, title, and body.
const mailSender = async (email, title, body) => {
    try{

        // here transporter 
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })


            let info = await transporter.sendMail({
                from: 'StudyNotion || Dev Kushwah',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = mailSender;