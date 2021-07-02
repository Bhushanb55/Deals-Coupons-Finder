module.exports = function(email){
    var nodemailer = require('nodemailer'); 
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'b55bhushan@gmail.com',
        pass: 'bhushan@123'
      }
    });
    
    var mailOptions = {
      from: 'b55bhushan@gmail.com',
      to: email,
      subject: 'Sending Email using Node.js',
      text: 'Welcome to the Deals and Coupons Finder App.'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}