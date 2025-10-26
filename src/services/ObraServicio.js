import axios from "axios";

const url = "https://localhost:7105/api/obra";

class ObraServicio {

    obtenerObras(empresaId){
        return axios.get(`${url}/empresa/${empresaId}`);
    }

}

export default new ObraServicio();