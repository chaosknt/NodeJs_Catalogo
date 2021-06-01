function crearErrorDniEnUso(message) {
  const error = new Error(message)
  error.type = 'ERROR_DNI_EN_USO'
  return error
}

export { crearErrorDniEnUso }