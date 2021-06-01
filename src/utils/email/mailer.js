const nodemailer = require("nodemailer");

/** 
 * Class Mailer receive a  @param {object} Settings in @constructor with the following properties:
 * 
 * @param {string} smtHost 'Email provider' 
 * @param {int} sendingPort 'SMTP port'
 * @param {boolean} isSecure 'is secure port, true for 465 '
 * @param {string} userName 'name@domaing.com'
 * @param {string} password 'Password'
 * 
 * @returns {Class Mailer} 
 * 
 * =========  AVAILABLE Functions ============
 * 
 *  @function Mailer.send @params 'to = email receiver, subject , htmlMsg = Messege to send in html format'
 * 
 */

class Mailer 
{ 
    constructor( settings )
    {    
      const { smtHost, sendingPort, isSecure, userName, password } = settings;

        this.validTypeOf( smtHost, sendingPort, isSecure, userName, password );        
               
        this.from =  userName;
        
        this.transporter = nodemailer.createTransport({
          host: smtHost,
          port: sendingPort,
          secure: isSecure, 
          auth: {
            user: userName,
            pass: password,
          },
        })               
       
    }        

    send = async ( { to, subject, htmlMsg} ) => {
     
      try {

        const resp = await this.transporter.sendMail({
          from: `${this.from}`, // sender address
          to: to,
          subject: subject, // Subject line          
          html: htmlMsg, // html body
        });
        
          console.log( `Email to ${ to } has been sent ${new Date(Date.now()).toDateString() }` ) 
        
      } catch ({response, responseCode}) {

          console.log(`Error when trying to send an email [code: ${ responseCode } response: ${ response }] `);
       
      }
                    
     
    }

    validTypeOf( smtHost, sendingPort, isSecure, userName, password )
    {
      if(typeof smtHost != "string")
      {
        throw new Error("smtHost type error");
      }
      if( typeof sendingPort != "number")
      {
        throw new Error("sendingPort type error");
      }
      if( typeof isSecure != "boolean")
      {
        throw new Error("isSecure type error");
      }
      if(typeof userName != "string")
      {
        throw new Error("userName type error");
      }
      if( typeof password != "string")
      {
        throw new Error("password type error");
      }
    }
  
}

module.exports  = Mailer 

          

