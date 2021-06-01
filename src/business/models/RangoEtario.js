function crearRangoEtario(datoDesde, datoHasta) {
    const desde = Number(datoDesde)
    const hasta = Number(datoHasta)

    if (isNaN(desde)) {
        throw crearErrorDatosInvalidos('debe especificarse un rango inicial numerico')
    }

    if (isNaN(hasta)) {
        throw crearErrorDatosInvalidos('debe especificarse un rango final numerico')
    }

    if (desde < 0) {
        throw crearErrorDatosInvalidos('el valor desde debe ser positivo')
    }

    if (hasta < 0) {
        throw crearErrorDatosInvalidos('el valor hasta debe ser positivo')
    }

    if (desde > hasta) {
        throw crearErrorDatosInvalidos('el rango es invalido, el inicio debe ser menor o igual al fin')
    }

    return { desde, hasta }
}

export { crearRangoEtario }