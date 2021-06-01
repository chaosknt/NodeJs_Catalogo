function crearDni(datoDni) {
    if (isNaN(datoDni)) {
        throw crearErrorDatosInvalidos('el dni debe ser numerico')
    }
    return datoDni
}

export { crearDni }