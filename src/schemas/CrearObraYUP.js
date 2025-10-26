import * as Yup from "yup";

export default Yup.object().shape({
    empresaId: Yup.number(),
    nombreObra: Yup.string().required("Este campo es obligatorio."),
    estado: Yup.number().required("Este campo es obligatorio.")
})