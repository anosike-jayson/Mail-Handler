const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/stay-awake', (req, res, next) => {
    res.status(200);
    res.send({ message: 'Wake up' });
  });

app.post('/send', (req, res) => {
    const { name, message } = req.body;
    const email = req.body.email;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MP
        }
    });

    console.log(email);
    const mailOptions = {
        from: 'Website Contact Form',
        to: process.env.EMAIL_USER,
        subject: `Contact Form Submission from ${name}`,
        text: `You have a new message from your website contact form:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
