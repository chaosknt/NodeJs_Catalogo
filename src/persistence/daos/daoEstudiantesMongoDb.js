import { crearEstudiante } from '../../negocio/modelos/Estudiante.js'

function crearDaoEstudiantesMongoDb(db) {

  const estudiantesCol = db.collection('estudiantes')

  return {
    add: async (estudiante) => {
      await estudiantesCol.insertOne(estudiante)
      delete estudiante._id
    },
    addUnique: async (estudiante, claveUnica) => {
      const existe = estudiantes.some(e => {
        return e[claveUnica] === estudiante[claveUnica]
      })
      if (existe) {
        return { added: 0 }
      } else {
        estudiantes.push(estudiante)
        return { added: 1 }
      }
    },
    addAll: async (estudiantesNuevos) => {
      estudiantesNuevos.forEach(e => estudiantes.push(e))
    },
    getAll: async () => {
      const registros = await estudiantesCol.find({}).toArray()
      const estudiantes = registros.map(r => {
        try {
          return crearEstudiante(r)
        } catch (err) {
          // loguear que hay datos mal formateados en la base!
        }
      })
      return estudiantes
    },
    getByDni: async (dni) => {
      return estudiantes.filter(e => e.dni === dni)
    },
    getByAge: async ({ desde, hasta }) => {
      const criteria = { edad: { $gte: desde, $lte: hasta } }
      const registros = await estudiantesCol.find(criteria).toArray()
      const estudiantes = registros.map(r => crearEstudiante(r))
      return estudiantes
    },
    deleteById: async (unId) => {
      const indiceParaBorrar = estudiantes.findIndex(e => e.id == unId)
      if (indiceParaBorrar === -1) {
        return { deleted: 0 }
      } else {
        estudiantes.splice(indiceParaBorrar, 1)
        return { deleted: 1 }
      }
    },
    updateById: async (estudiante) => {
      const indiceParaReemplazar = estudiantes.findIndex(e => e.id == estudiante.id)
      if (indiceParaReemplazar === -1) {
        return { updated: 0 }
      } else {
        estudiantes[indiceParaReemplazar] = estudiante
        return { updated: 1 }
      }
    }
  }
}

export { crearDaoEstudiantesMongoDb }