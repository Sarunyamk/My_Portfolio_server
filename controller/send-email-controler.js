const nodemailer = require('nodemailer');
require('dotenv').config();
const createError = require("../util/createError")

const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL_ADMIN,
            pass: process.env.EMAIL_PASS,
        },
    });
};

const sendEmailByNodemailer = async (email, name, subject, message) => {

    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_ADMIN,
        to: process.env.EMAIL_ADMIN,
        subject: subject,
        html: `
      <div>
        <p><strong>Message from :</strong> ${email}</p>
       <p><strong>Name : </strong>${name}</p>
       <p><strong>Detail : </strong>${message}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
};
const sendThankYouEmail = async (email) => {

    const transporter = createTransporter();

    const thankYouOptions = {
        from: process.env.EMAIL_ADMIN,
        to: email,
        subject: 'Thank you for your message',
        html: `
                <div>
                  <p><strong>Hi I'm Sarunya Vajapattana </strong></p>
                  <p><strong>Thank you for reaching out to us through our portfolio website!</strong></p>
                  <p>We appreciate your interest and will get back to you as soon as possible.</p>
                  <p>Meanwhile, please find my resume.</p>
                  <p>Looking forward to collaborating with you!</p>
                  <img src="https://res.cloudinary.com/mnksarunya/image/upload/w_400/v1732200866/us0ibtfulp6ruk6botcc.png" 
                        style="max-width: 50%; height: auto;">                  
                </div>`
    };
    try {
        await transporter.sendMail(thankYouOptions);
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
};


exports.sendEmail = async (req, res, next) => {

    try {

        const { email, name, subject, message } = req.body;

        if (!email || !name || !subject || !message) {
            return createError(400, "Please fill in all the required fields.");
        }
        const responseEmail = await sendEmailByNodemailer(email, name, subject, message);

        if (!responseEmail) {
            return createError(500, "Failed to send email");
        }
        const replyEmail = await sendThankYouEmail(email);
        if (!replyEmail) {
            return createError(500, "Failed to reply email");
        }
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        next(error);
    }
};


