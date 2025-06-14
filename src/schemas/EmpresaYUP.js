import * as Yup from 'yup';

export default Yup.object().shape({
    Id: Yup.number().default(0),
    NombreEmpresa: Yup.string().required("Este campo es obligatorio."),
    CUIT: Yup.string().required("Este campo es obligatorio.").matches(/^[^a-zA-Z]*$/, 'No se permiten letras'),
    RazonSocial: Yup.string().required("Este campo es obligatorio."),
    Estado: Yup.bool().default(true),
    Celular: Yup.string().nullable().transform((v, ov) => ov == '' ? null : v),
    Email: Yup.string().email().nullable().transform((v, ov) => ov == '' ? null : v)
});