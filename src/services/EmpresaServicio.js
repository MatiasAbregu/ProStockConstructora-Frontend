import axios from "axios";

const url = "https://localhost:7105/api/empresa";

class EmpresaServicio {

    obtenerEmpresas() {
        return axios.get(`${url}/obtener-empresas`);
    }

    obtenerEmpresasAAsociar() {
        return axios.get(`${url}/obtener-empresas-para-asociar`);
    }

    obtenerEmpresaPorId(id) {
        return axios.get(`${url}/obtener-empresas/${id}`);
    }

    crearEmpresa(empresa) {
        return axios.post(`${url}/crear`, empresa);
    }

    actualizarEmpresa(id, empresa) {
        return axios.put(`${url}/actualizar/${id}`, empresa);
    }

    cambiarEstadoEmpresa(id) {
        return axios.delete(`${url}/estado/${id}`);
    }
}

export default new EmpresaServicio();