const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmailByNodemailer = async (email, name, subject, message) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL_ADMIN,
            pass: process.env.EMAIL_PASS,
        },
    });

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
    const thankYouTransporter = {
        from: process.env.EMAIL_ADMIN,
        to: email,
        subject: 'Thank you for your message',
        html: `
                <div>
                  <p><strong>Hi I'm Sarunya Vajapattana </strong></p>
                  <p><strong>Thank you for reaching out to us through our portfolio website!</strong></p>
                  <p>We appreciate your interest and will get back to you as soon as possible.</p>
                  <p>Meanwhile, please find our resume attached file.</p>
                  <p>Looking forward to collaborating with you!</p>
                  <img src="https://res.cloudinary.com/mnksarunya/image/upload/w_400/v1731987143/dwr9pdaeufsphgmqydby.png" 
                        style="max-width: 50%; height: auto;">                  
                </div>`
    };
    try {
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(thankYouTransporter);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to send email', error };
    }
};


exports.sendEmail = async (req, res) => {

    try {

        const { email, name, subject, message } = req.body;
        if (!email || !name || !subject || !message) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const responseEmail = await sendEmailByNodemailer(email, name, subject, message);

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};


