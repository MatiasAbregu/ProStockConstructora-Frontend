// 1° Importar nuestro HttpServicio
import axios from "axios";

// 2° Poner la URL de la API
const url = "https://localhost:7105/api/recursos"

class RecursoServicio {

    // GET
    traerRecursorDeposito(depositoId) {
        return axios.get(`${url}/deposito/${depositoId}`);
    }

    // POST
    crearRecurso(recurso) {

    }

    cargarRecursoADeposito(recurso, cant, depositoId){

    }

}

// Por último, exportamos el servicio a todo nuestro programa (seria como hacer referencia)
export default new RecursoServicio();