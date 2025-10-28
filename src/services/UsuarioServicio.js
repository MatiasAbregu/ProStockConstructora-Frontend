import axios from "axios";

const url = "https://localhost:7105/api/usuario";
const url2 = "https://localhost:7105/api/roles";

class UsuarioServicio {

    ObtenerAdministradores(){
        return axios.get(`${url}/obtener-administradores`);
    }

    ObtenerUsuariosEmpresa(id) {
        return axios.get(`${url}/${id}`);
    }

    ObtenerUsuarioPorId(id) {
        return axios.get(`${url}/obtener-usuario/${id}`)
    }

    CrearUsuario(usuario) {
        return axios.post(`${url}`, usuario);
    }

    ActualizarUsuario(id, usuario) {
        return axios.put(`${url}/${id}`, usuario);
    }

    CambiarEstadoUsuario(id) {
        return axios.delete(`${url}/${id}`);
    }

    ObtenerRoles() {
        return axios.get(`${url2}`)
    }
}

export default new UsuarioServicio();