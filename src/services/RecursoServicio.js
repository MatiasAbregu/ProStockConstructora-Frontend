// 1° Importar nuestro HttpServicio
import axios from "axios";

// 2° Poner la URL de la API
const url = "https://localhost:7105/api/recursos"

class RecursoServicio {

    // GET
    traerRecursosDeDeposito(depositoId) {
        return axios.get(`${url}/deposito/${depositoId}`);
    }

    traerRecursoDepositoPorStockId(stockId) {
        return axios.get(`${url}/${stockId}`);
    }

    // POST
    crearRecurso(recurso, depositoId) {
        return axios.post(`${url}/${depositoId}`, recurso);
    }

    // PUT
    actualizarRecurso(recurso, depositoId) {
        return axios.put(`${url}/deposito/actualizarstock/${depositoId}`, recurso);
    }

    // Eliminar
    eliminarRecurso(stockId) {
        return axios.delete(`${url}/deposito/eliminartock/${stockId}`);
    }
}

// Por último, exportamos el servicio a todo nuestro programa (seria como hacer referencia)
export default new RecursoServicio();