function crearErrorEstudianteNoEncontrado() {
  const error = new Error('no existe estudiante con ese id')
  error.type = 'ERROR_ESTUDIANTE_NO_ENCONTRADO'
  return error
}

export { crearErrorEstudianteNoEncontrado }