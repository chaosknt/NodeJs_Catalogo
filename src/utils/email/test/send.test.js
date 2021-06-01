const assert = require('assert')
const Mailer = require('../mailer')

    describe('Testear usuario y contraseña al enviar un email:', () => {
        
        describe('Si el usuario y password son correctos:', () => {
            it('Enviaria el Email (no hace nada) ', () => {
                assert.rejects(async () => {
                
                    const mail = new Mailer( { smtHost:"smtp.gmail.com", 
                    sendingPort: 465, 
                    isSecure: true, 
                    userName: "chaosknta@gmail.com",
                    password: "jbldeufekenfclon" } )
    
                    await mail.send( {to:"chaosknt@gmail.com", from:"test", htmlMsg:"testeando"} );
    
                })
            })
        })
    
           
     })
    