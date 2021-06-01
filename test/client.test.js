import assert from 'assert'
import { crearClienteRest } from './ClienteRest.js'

describe('client', () => {
    describe('si no se encuentra al servidor', () => {
        it('lanza un error', async () => {
            const cliente = crearClienteRest({
                url: 'http://localhost:0/api/estudiantes'
            })
            await assert.rejects(async () => {
                await cliente.getAll()
            }, error => {
                assert.strictEqual(error.message, 'error al enviar la peticion')
                return true
            })
        })
    })
})