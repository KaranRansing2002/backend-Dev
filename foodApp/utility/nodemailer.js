const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail=async function sendMail(str,data) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'ransingkaran495@gmail.com', // generated ethereal user
      pass: 'hatruzrrlvelmjve', // generated ethereal password
    },
  });

  var Osubject,Otext,Ohtml;
  if(str=="signup"){
    Osubject=`Thank you for signing ${data.name}`;
    Ohtml=`
    <h1>Welcome to foodApp.com</h1>
    Hope u had a good time
    here are your details
    Name : ${data.name}
    Email : ${data.email}
    `
  }else if(str=="resetPassword"){
    Osubject='Reset Password';
    Ohtml=`link for reset password ${data.resetPasswordLink}`
  }

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Food App 👻" <ransingkaran495@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    //text: Otext, // plain text body
    html: Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  
}
