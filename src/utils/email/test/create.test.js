const assert = require('assert')
const Mailer = require('../mailer')

describe('Test Creacion del objeto Mailer', () => {

describe('Se intenta crear un objeto', () => {    

    it('lanza un error al pasarle mal el tipo de dato smtHost', () => {

        assert.throws(() => {

            const mail = new Mailer( { smtHost: 1234, 
            sendingPort: 465, 
            isSecure: true, 
            userName: "chaosknt@gmail.com",
            password: "jbldeufekenfclon" } )
            
        }, () => {            
            return true
        })
    })

    it('lanza un error al pasarle mal el tipo de dato sendingPort', () => {

        assert.throws(() => {

            const mail = new Mailer( { smtHost:"smtp.gmail.com", 
            sendingPort: "465", 
            isSecure: true, 
            userName: "chaosknt@gmail.com",
            password: "jbldeufekenfclon" } )
            
        }, () => {            
            return true
        })
    })

    it('lanza un error al pasarle mal el tipo de dato isSecure', () => {

        assert.throws(() => {

            const mail = new Mailer( { smtHost:"smtp.gmail.com", 
            sendingPort: "465", 
            isSecure: "123", 
            userName: "chaosknt@gmail.com",
            password: "jbldeufekenfclon" } )
            
        }, () => {            
            return true
        })
    })

    it('lanza un error al pasarle mal el tipo de dato userName', () => {

        assert.throws(() => {

            const mail = new Mailer( { smtHost:"smtp.gmail.com", 
            sendingPort: "465", 
            isSecure: true, 
            userName: "chaosknt@gmail.com",
            password: true } )
            
        }, () => {            
            return true
        })
    })

    it('lanza un error al pasarle mal el tipo de dato password', () => {

        assert.throws(() => {

            const mail = new Mailer( { smtHost:"smtp.gmail.com", 
            sendingPort: "465", 
            isSecure: true, 
            userName: "chaosknt@gmail.com",
            password: true } )
            
        }, () => {            
            return true
        })
    })
})
    

})





