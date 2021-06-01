import express from 'express'

function crearRouterEstudiantes(apiEstudiantes) {
  const routerEstudiantes = express.Router()

  routerEstudiantes.get('/', async (req, res, next) => {
    try {
      let estudiantes
      if (req.query.dni) {
        estudiantes = await apiEstudiantes.getByDni(req.query.dni)
      } else if (req.query.desde && req.query.hasta) {
        estudiantes = await apiEstudiantes.getByAge({
          desde: req.query.desde,
          hasta: req.query.hasta
        })
      } else {
        estudiantes = await apiEstudiantes.getAll()
      }
      res.json(estudiantes)
    } catch (error) {
      next(error)
    }
  })

  routerEstudiantes.post('/', async (req, res, next) => {
    try {
      const estudiante = await apiEstudiantes.add(req.body)
      res.status(201).json(estudiante)
    } catch (error) {
      next(error)
    }
  })

  routerEstudiantes.delete('/:id', async (req, res, next) => {
    try {
      await apiEstudiantes.deleteById(req.params.id)
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  })

  routerEstudiantes.put('/:id', async (req, res, next) => {
    try {
      const estudiante = await apiEstudiantes.updateById(req.body, req.params.id)
      res.json(estudiante)
    } catch (error) {
      next(error)
    }
  })

  routerEstudiantes.use((error, req, res, next) => {
    if (error.type === 'ERROR_DNI_EN_USO') {
      res.status(400)
    } else if (error.type === 'ERROR_DATOS_INVALIDOS') {
      res.status(400)
    } else if (error.type === 'ERROR_ESTUDIANTE_NO_ENCONTRADO') {
      res.status(404)
    } else {
      res.status(500)
    }
    res.json({ message: error.message })
  })

  return routerEstudiantes
}

export { crearRouterEstudiantes }