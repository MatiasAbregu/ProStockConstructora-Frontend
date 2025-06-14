import axios from "axios";

const url = "https://localhost:7105/api/usuario";

class UsuarioServicio {

    ObtenerAdministradores(){
        return axios.get(`${url}/obtener-administradores`);
    }

}

export default new UsuarioServicio();