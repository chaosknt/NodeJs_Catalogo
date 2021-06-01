function crearDaoEstudiantesCache() {

  const estudiantes = []

  return {
    add: async (estudiante) => {
      estudiantes.push(estudiante)
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
      return [...estudiantes]
    },
    getByDni: async (dni) => {
      return estudiantes.filter(e => e.dni === dni)
    },
    getByAge: async ({ desde, hasta }) => {
      return estudiantes.filter(e => e.edad >= desde && e.edad <= hasta)
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
        estudiantes.splice(indiceParaReemplazar, 1, estudiante)
        return { updated: 1 }
      }
    }
  }
}

export { crearDaoEstudiantesCache }