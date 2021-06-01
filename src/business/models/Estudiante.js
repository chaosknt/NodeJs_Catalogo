import { crearErrorDatosInvalidos } from '../errores/ErrorDatosInvalidos.js'
import { crearDni } from './Dni.js'

let nextId = 1

function crearEstudiante(datos, id = null) {
    const estu = {}

    if (!datos.nombre) {
        throw crearErrorDatosInvalidos('falta el nombre')
    } else {
        estu.nombre = datos.nombre
    }

    if (!datos.apellido) {
        throw crearErrorDatosInvalidos('falta el apellido')
    } else {
        estu.apellido = datos.apellido
    }

    if (!datos.edad) {
        throw crearErrorDatosInvalidos('falta la edad')
    }

    if (isNaN(Number(datos.edad))) {
        throw crearErrorDatosInvalidos('la edad debe ser un entero')
    } else {
        estu.edad = Number(datos.edad)
    }

    if (!datos.dni) {
        throw crearErrorDatosInvalidos('falta el dni')
    }

    estu.dni = crearDni(datos.dni)

    if (id) {
        estu.id = Number(id)
    } else if (!isNaN(Number(datos.id))) {
        estu.id = Number(datos.id)
    } else {
        estu.id = nextId++
    }

    return estu
}

export { crearEstudiante }