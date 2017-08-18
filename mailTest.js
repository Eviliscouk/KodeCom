const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'mail.paygenieonline.co.uk',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'notify@paygenieonline.co.uk',
        pass: 'Lilly82!'
    }
});

console.log('set transporter');

// setup email data with unicode symbols
let mailOptions = {
    from: 'notify@paygenieonline.co.uk', // sender address
    to: 'kerrjp@hotmail.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world', // plain text body
    //html: '<b>Hello world ?</b>' // html body
};

console.log('set options');

// send mail with defined transport object

console.log('sending Mail');
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});