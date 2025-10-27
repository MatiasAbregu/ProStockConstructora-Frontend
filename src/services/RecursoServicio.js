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
    actualizarRecurso(recursoId) {
        return axios.put(`${url}/${recursoId}`, recursoId);
    }
}

// Por último, exportamos el servicio a todo nuestro programa (seria como hacer referencia)
export default new RecursoServicio();