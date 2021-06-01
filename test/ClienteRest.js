import axios from 'axios'

function crearClienteRest(serverData) {

    const { url } = serverData

    return {
        getAll: async () => {
            return await sendRequest({ url })
        },
        getByDni: async (unDni) => {
            return await sendRequest({ url, params: { dni: unDni } })
        },
        post: async (estudiante) => {
            return await sendRequest({ url, method: 'post', data: estudiante })
        },
        put: async (estudiante) => {
            return await sendRequest({ url: url + `/${estudiante.id}`, method: 'put', data: estudiante })
        },
        getByAge: async ({ desde, hasta }) => {
            return await sendRequest({ url, params: { desde, hasta } })
        },
        deleteById: async (unId) => {
            return await sendRequest({ url: url + `/${unId}`, method: 'delete' })
        }
    }
}

async function sendRequest(req) {
    try {
        return await axios(req)
    } catch (error) {
        if (error.response) {
            const NE = new Error(`error ${error.response.status} enviado desde el servidor: ${error.response.data.message}`)
            NE.status = error.response.status
            NE.message = error.response.data.message
            throw NE
        } else {
            throw new Error('error al enviar la peticion')
        }
    }
}

export { crearClienteRest }