const assert = require('assert')
const Mailer = require('../mailer')

describe('Test Validacion Usuario y contraseña', () => {
    
    
        describe('si el usuario es incorrecto', () => {
            it('lanza un error', () => {
                assert.rejects(async () => {
                
                    const mail = new Mailer( { smtHost:"smtp.gmail.com", 
                               sendingPort: 465, 
                               isSecure: true, 
                               userName: "chaosknta@gmail.com",
                               password: "jbldeufekenfclon" } )
                await mail.send( {to:"chaosknt@gmail.com", from:"test", htmlMsg:"holaaaa"} );
    
                })
            })
        })
    
        describe('si el password es incorrecto', () => {
            it('lanza un error', () => {
                assert.rejects(async () => {
                
                    const mail = new Mailer( { smtHost:"smtp.gmail.com", 
                               sendingPort: 465, 
                               isSecure: true, 
                               userName: "chaosknta@gmail.com",
                               password: "312" } )
                await mail.send( {to:"chaosknt@gmail.com", from:"test", htmlMsg:"holaaaa"} );
    
                })
            })
        })
        
    
    })
    
    
    
    