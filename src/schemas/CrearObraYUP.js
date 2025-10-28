import * as Yup from "yup";

export default Yup.object().shape({
    empresaId: Yup.number(),
    codigoObra: Yup.string().required("Este campo es obligatorio."),
    nombreObra: Yup.string().required("Este campo es obligatorio."),
    estado: Yup.number().required("Este campo es obligatorio.")
});