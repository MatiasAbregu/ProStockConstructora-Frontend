import axios from "axios";

const url = "https://localhost:7105/api/deposito";

class DepositoServicio {

    obtenerDepositosDeObra(obraId) {
        return axios.get(`${url}/obra/${obraId}`);
    }
    
    obtenerDepositoPorId(depositoId) {
        
    }

    crearDeposito(deposito) {
        return axios.post(`${url}/crear`, deposito);
    }
}

export default new DepositoServicio();