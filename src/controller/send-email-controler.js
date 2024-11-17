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
        from: email,
        to: process.env.EMAIL_ADMIN,
        subject: subject,
        html: `
      <div>
        <p><strong>Message from :</strong> ${email}</p>
       <br/>
       <p><strong>Name : </strong>${name}</p>
       <p><strong>Detail : </strong>${message}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
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

        const { success, message: responseMessage, error } = await sendEmailByNodemailer(recipient, subject, message, googleId);

        if (success) {
            res.status(200).json({ message: responseMessage });
        } else {
            res.status(500).json({ message: responseMessage, error });
        }
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid or expired token', error });
    }
};
