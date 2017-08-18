(function(mailer){
    
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport

let transporter = nodemailer.createTransport({
    host: 'mail.paygenieonline.co.uk',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'notify@paygenieonline.co.uk',
        pass: 'Lilly82!'
    },
	tls: {
        rejectUnauthorized: false
    }
});

mailer.send = function(params,cb){
    
    
    let mailOptions = {
        from: params.from,
        to: params.to,
        subject: params.subject,
        text: params.message,
        attachments:params.attachments
        //html: '<b>Hello world ?</b>' // html body
    };

    //console.log('email sent');
    //console.log(JSON.stringify(mailOptions));
    //return cb(null,'sent');

    transporter.sendMail(mailOptions, function (error, info){
    
        if (error) {
            console.log(error);
            return cb(error);
        }
    
        console.log('Message %s sent: %s', info.messageId, info.response);
        return cb(null,info);
    });
}


}(module.exports));