import assert from 'assert'
import { crearServidor } from '../src/ruteo/Servidor.js'
import { crearApiEstudiantes } from '../src/negocio/apis/apiEstudiantes.js'
import { crearDaoEstudiantesRoto } from './daoEstudiantesRoto.js'
import { crearDaoEstudiantesCache } from '../src/persistencia/daos/daoEstudiantesCache.js'
import { crearClienteRest } from './ClienteRest.js'
import { crearEstudiante } from '../src/negocio/modelos/Estudiante.js'

const estuValido = {
    nombre: 'mariano',
    apellido: 'aquino',
    edad: 34,
    dni: '123'
}

const estuInvalido = {
    apellido: 'aquino',
    edad: 34,
    dni: '123'
}

const estuValido2 = {
    nombre: 'juana',
    apellido: 'perez',
    edad: 35,
    dni: '456'
}

function sinId(estudiantes) {
    return estudiantes.map(e => {
        delete e.id
        return e
    })
}

let aplicacion
let servidor
let cliente
let daoEstudiantes

describe('servidor', () => {

    beforeEach(async () => {
        daoEstudiantes = crearDaoEstudiantesCache()
        aplicacion = crearApiEstudiantes({ daoEstudiantes })
        servidor = await crearServidor({ aplicacion })
        cliente = crearClienteRest({
            url: `http://localhost:${servidor.port}/api/estudiantes`
        })
    })

    afterEach(() => {
        servidor.close()
    })

    describe('si el puerto esta ocupado', () => {
        it('lanza un error', async () => {
            await assert.rejects(async () => {
                const servidor2 = await crearServidor({ port: servidor.port, aplicacion })
                servidor2.close()
            })
        })
    })


    describe('getAll', () => {
        describe('si no hay estudiantes', () => {
            it('devuelve una coleccion vacia', async () => {
                const { data: recibidos } = await cliente.getAll()
                const esperados = []
                assert.deepStrictEqual(recibidos, esperados)
            })
        })

        describe('si hay estudiantes', () => {
            it('devuelve una coleccion con esos estudiantes', async () => {
                const estu1 = crearEstudiante(estuValido)
                const estu2 = crearEstudiante(estuValido2)
                await daoEstudiantes.addAll([estu1, estu2])
                const { data: recibidos } = await cliente.getAll()
                const esperado = [estuValido, estuValido2]
                assert.deepStrictEqual(sinId(recibidos), esperado)
            })
        })
    })

    describe('getByDni', () => {
        describe('si hay estudiantes pero ninguno con ese dni', () => {
            it('devuelve una coleccion vacia', async () => {
                const estu2 = crearEstudiante(estuValido2)
                await daoEstudiantes.add(estu2)
                const { data: recibidos } = await cliente.getByDni('123')
                const esperado = []
                assert.deepStrictEqual(sinId(recibidos), esperado)
            })
        })

        describe('si hay estudiantes y alguno con ese dni', () => {
            it('devuelve una coleccion con ese estudiante', async () => {
                const estu1 = crearEstudiante(estuValido)
                const estu2 = crearEstudiante(estuValido2)
                await daoEstudiantes.addAll([estu1, estu2])
                const { data: recibidos } = await cliente.getByDni('123')
                const esperado = [estuValido]
                assert.deepStrictEqual(sinId(recibidos), esperado)
            })
        })
    })

    describe('getByAge', () => {
        describe('si hay estudiantes pero ninguno con edad en rango', () => {
            it('devuelve una coleccion vacia', async () => {
                const estu1 = crearEstudiante(estuValido)
                const estu2 = crearEstudiante(estuValido2)
                await daoEstudiantes.addAll([estu1, estu2])
                const { data: recibidos } = await cliente.getByAge({
                    desde: 90,
                    hasta: 100
                })
                const esperado = []
                assert.deepStrictEqual(sinId(recibidos), esperado)
            })
        })

        describe('si hay estudiantes y alguno con edad en rango', () => {
            it('devuelve una coleccion con esxs estudiantes', async () => {
                const estu1 = crearEstudiante(estuValido)
                const estu2 = crearEstudiante(estuValido2)
                await daoEstudiantes.addAll([estu1, estu2])
                const { data: recibidos } = await cliente.getByAge({
                    desde: 20,
                    hasta: 34
                })
                const esperado = [estuValido]
                assert.deepStrictEqual(sinId(recibidos), esperado)
            })
        })
    })

    describe('post', () => {
        describe('si hay estudiantes con el mismo dni', () => {
            it('devuelve un codigo 400 y no lo agrega a la coleccion', async () => {
                const estu1 = crearEstudiante(estuValido)
                await daoEstudiantes.add(estu1)
                await assert.rejects(async () => {
                    await cliente.post(estuValido)
                }, err => {
                    assert.strictEqual(err.status, 400)
                    return true
                })
            })
        })

        describe('si no hay estudiantes con el nuevo dni', () => {
            it('asigna un id al estudiante y lo agrega a la coleccion', async () => {
                const { data: estuAgregado, status } = await cliente.post(estuValido)
                assert.strictEqual(status, 201)
                assert(estuAgregado.hasOwnProperty('id'))
                delete estuAgregado.id
                assert.deepStrictEqual(estuAgregado, estuValido)
            })
        })

        describe('al agregar nuevxs estudiantes', () => {
            it('asigna nuevos ids para cada unx', async () => {
                const { data: estuAgregado1 } = await cliente.post(estuValido)
                const { data: estuAgregado2 } = await cliente.post(estuValido2)
                assert(estuAgregado1.hasOwnProperty('id'))
                assert(estuAgregado2.hasOwnProperty('id'))
                assert(estuAgregado1.id !== estuAgregado2.id)
            })
        })

        describe('si los datos del estudiante estan mal formados', () => {
            it('devuelve un codigo 400 y no lo agrega a la coleccion', async () => {
                await assert.rejects(async () => {
                    await cliente.post(estuInvalido)
                }, err => {
                    assert.strictEqual(err.status, 400)
                    return true
                })
            })
        })
    })

    describe('deleteById', () => {
        describe('si no hay un estudiantes con ese id', () => {
            it('lanza un error', async () => {
                await assert.rejects(async () => {
                    await cliente.deleteById(1)
                }, response => {
                    assert.strictEqual(response.status, 404)
                    return true
                })
            })
        })

        describe('si hay estudiantes y alguno con ese id', () => {
            it('lo borra del sistema', async () => {
                const estuCreado = crearEstudiante(estuValido)
                const estuCreado2 = crearEstudiante(estuValido2)
                await daoEstudiantes.addAll([estuCreado, estuCreado2])
                await cliente.deleteById(estuCreado.id)
                const recibidos = await aplicacion.getAll()
                assert.deepStrictEqual(recibidos, [estuCreado2])
            })
        })
    })

    describe('put', () => {
        describe('si no hay un estudiantes con ese id', () => {
            it('lanza un error', async () => {
                const estuCreado = crearEstudiante(estuValido)
                await assert.rejects(async () => {
                    await cliente.put(estuCreado)
                }, error => {
                    assert.strictEqual(error.status, 404)
                    assert.strictEqual(error.message, 'no existe estudiante con ese id')
                    return true
                })
            })
        })

        describe('si hay estudiantes y alguno con ese id', () => {
            it('lo reemplaza', async () => {
                const estuCreado = crearEstudiante(estuValido)
                await daoEstudiantes.add(estuCreado)

                const estuModificado = { ...estuCreado }
                estuModificado.nombre = 'nuevo nombre'
                estuModificado.apellido = 'nuevo apellido'

                const { data: estuRecibido } = await cliente.put(estuModificado)

                assert.deepStrictEqual(estuModificado, estuRecibido)
                const recibidos = await aplicacion.getAll()
                assert.deepStrictEqual(recibidos, [estuModificado])
            })
        })
    })
})

async function assertItThrows500(method, ...params) {
    await assert.rejects(async () => {
        await method(...params)
    }, error => {
        assert.strictEqual(error.status, 500)
        return true
    })
}

describe('servidor con base de datos caida', () => {

    beforeEach(async () => {
        daoEstudiantes = crearDaoEstudiantesRoto()
        aplicacion = crearApiEstudiantes({ daoEstudiantes })
        servidor = await crearServidor({ aplicacion })
        cliente = crearClienteRest({
            url: `http://localhost:${servidor.port}/api/estudiantes`
        })
    })

    afterEach(() => {
        servidor.close()
    })

    describe('getAll', () => {
        it('lanza un error con codigo de error 500', async () => {
            await assertItThrows500(cliente.getAll)
        })
    })

    describe('getByDni', () => {
        it('lanza un error con codigo de error 500', async () => {
            await assertItThrows500(cliente.getByDni, '123')
        })
    })

    describe('getByAge', () => {
        it('lanza un error con codigo de error 500', async () => {
            await assertItThrows500(cliente.getByAge, {
                desde: 90,
                hasta: 100
            })
        })
    })

    describe('post', () => {
        it('lanza un error con codigo de error 500', async () => {
            await assertItThrows500(cliente.post, estuValido)
        })
    })

    describe('deleteById', () => {
        describe('si no hay un estudiantes con ese id', () => {
            it('lanza un error lanza un error 500', async () => {
                await assertItThrows500(cliente.deleteById, 1)
            })
        })
    })
})