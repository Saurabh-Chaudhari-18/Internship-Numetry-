
const transporter = require('./config/nodemailerConfig');

let mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'saurabhgurjar1809@gmail.com',
    subject: 'This is mail from Saurabh',
    text: 'Heyyy, How you doing?. this is just a checking mail'
};

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log('Error occurred:', error);
    } else {
        console.log('Email sent to :', mailOptions.to);
    }
});
