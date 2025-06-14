import axios from "axios";

const url = "https://localhost:7105/api/empresa";

class EmpresaServicio {

    obtenerEmpresas() {
        return axios.get(`${url}/obtener-empresas`);
    }

    crearEmpresa(empresa) {
        return axios.post(`${url}/crear`, empresa);
    }
}

export default new EmpresaServicio();