// 1° Importar YUP pero como objeto
import * as Yup from 'yup';

// 2° Crear SCHEMA que sería el FAMOSO DTO
export default Yup.object().shape({
    codigoISO: Yup.string().required("El código ISO es obligatorio."),
    tipo: Yup.number(),
    nombre: Yup.string().required("El nombre del recurso es obligatorio"),
    tipoMaterial: Yup.number(),
    unidadDeMedida: Yup.number(),
    descripcion: Yup.string()
});

// {
//   "
//   "descripcion": "string"
// }