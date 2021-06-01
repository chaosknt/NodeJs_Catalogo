import { crearServidor } from './ruteo/Servidor.js'
import { crearApiEstudiantes } from './negocio/apis/apiEstudiantes.js'
import { crearClienteRest } from '../test/ClienteRest.js'
import { crearDaoEstudiantesCache } from './persistencia/daos/daoEstudiantesCache.js'


async function main() {
  const daoEstudiantes = crearDaoEstudiantesCache()
  const aplicacion = crearApiEstudiantes({ daoEstudiantes })
  const servidor = await crearServidor({ aplicacion, port: 8080 })


  const cliente = crearClienteRest({
    url: `http://localhost:${servidor.port}/api/estudiantes`
  })

  await cliente.post({
    nombre: 'mariano',
    apellido: 'aquino',
    edad: 34,
    dni: '123'
  })

  const { data } = await cliente.getAll()

  console.log(data)

  servidor.close()
}

main()