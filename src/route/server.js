import express from 'express'

import { crearRouterEstudiantes } from './routers/routerEstudiantes.js'

function crearServidor({ aplicacion, port = 0 }) {

    const app = express()

    app.use(express.json())

    app.use('/api/estudiantes', crearRouterEstudiantes(aplicacion))

    return new Promise((resolve, reject) => {
        const server = app.listen(port)
            .once('error', () => {
                reject(new Error('error al conectarse al servidor'))
            })
            .once('listening', () => {
                server.port = server.address().port
                resolve(server)
            })
    })
}

export { crearServidor }