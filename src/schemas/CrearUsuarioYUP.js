import * as Yup from 'yup';

export default Yup.object().shape({
    Id: Yup.number().default(0),
    NombreUsuario: Yup.string().required("El nombre de usuario es obligatorio."),
    EmpresaId: Yup.number().min(1, "Asociar el usuario a una empresa es obligatorio"),
    Email: Yup.string().email("Un email contiene un @ y puede terminar en .com").nullable().transform((v, ov) => ov == '' ? null : v),
    Celular: Yup.string().nullable().transform((v, ov) => ov == '' ? null : v),
})