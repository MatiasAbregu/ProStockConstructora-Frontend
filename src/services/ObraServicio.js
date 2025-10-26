import axios from "axios";

const url = "https://localhost:7105/api/obra";

class ObraServicio {

    obtenerObras(empresaId) {
        return axios.get(`${url}/empresa/${empresaId}`);
    }

    obtenerObraPorId(id) {
        return axios.get(`${url}/${id}`)
    }

    crearObra(obra) {
        return axios.post(`${url}`, obra);
    }

    actualizarObra(id, obra) {
        return axios.put(`${url}/${{id}}`, obra);
    }
}

export default new ObraServicio();