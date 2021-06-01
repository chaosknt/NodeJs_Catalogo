/**
 * Implementation Example * 
 */

const Mailer = require('./mailer.js');
const settings = require('./settings');

const sendingObject = {
  
  to: "chaosknt@gmail.com", 
  subject: "Test Email", 
  htmlMsg: "Probando correo"
}

const mail = new Mailer (settings);    

const { to, subject, htmlMsg } = sendingObject;

try {
  
  mail.send( {to, subject, htmlMsg } ) ; 

} catch (error) {

  console.log(error)
  
}


               