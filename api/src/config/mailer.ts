const nodemailer = require("nodemailer");
const ownerEmail = ''// ingresas mail 
const appPasword = ''//ingresar clave de aplicacion de gmail


export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: ownerEmail, // generated ethereal user
      pass: appPasword, // generated ethereal password
    },
  });

  transporter.verify().then(()=>{
    console.log('Everything its ok, ready to send email');
    
  })
