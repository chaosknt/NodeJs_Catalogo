import { crearErrorDniEnUso } from '../errores/ErrorDniEnUso.js'
import { crearErrorEstudianteNoEncontrado } from '../errores/ErrorEstudianteNoEncontrado.js'

import { crearEstudiante } from '../modelos/Estudiante.js'

import { crearRangoEtario } from '../modelos/RangoEtario.js'
import { crearDni } from '../modelos/Dni.js'

function crearApiEstudiantes({ daoEstudiantes }) {

    return {

        add: async (datosEstudiante) => {
            const estudiante = crearEstudiante(datosEstudiante)
            const { added } = await daoEstudiantes.addUnique(estudiante, 'dni')
            if (!added) {
                throw crearErrorDniEnUso('ya existe un estudiante con este dni')
            }
            return estudiante
        },
        getAll: async () => {
            return await daoEstudiantes.getAll()
        },
        getByDni: async (datoDni) => {
            const dni = crearDni(datoDni)
            return await daoEstudiantes.getByDni(dni)
        },
        getByAge: async ({ desde, hasta }) => {
            const rangoEtario = crearRangoEtario(desde, hasta)
            return await daoEstudiantes.getByAge(rangoEtario)
        },
        deleteById: async (unId) => {
            const { deleted } = await daoEstudiantes.deleteById(unId)
            if (!deleted) {
                throw crearErrorEstudianteNoEncontrado()
            }
        },
        updateById: async (datosEstudiante, elId) => {
            const estudiante = crearEstudiante(datosEstudiante, elId)
            const { updated } = await daoEstudiantes.updateById(estudiante)
            if (!updated) {
                throw crearErrorEstudianteNoEncontrado()
            }
            return estudiante
        }
    }
}

export { crearApiEstudiantes }