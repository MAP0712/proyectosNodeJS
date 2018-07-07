const NodeMailer = require('nodemailer');
let Email = {};

Email.transporter = NodeMailer.createTransport({
    service: "gmail",
        auth: {
            user: 'ghnodemailer@gmail.com',
            pass: 'nodemailer',
        },
        tls: {rejectUnauthorized: true}
    },
    {
        from: 'ghnodemailer@gmail.com',
        headers: {}
    }        
);

module.exports = Email;