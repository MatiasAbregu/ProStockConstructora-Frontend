// 1° Importar YUP pero como objeto
import * as Yup from 'yup';

// 2° Crear SCHEMA que sería el FAMOSO DTO
export default Yup.object().shape({
    codigoISO: Yup.string().required("El código ISO es obligatorio."),
    tipo: Yup.number(),
    nombre: Yup.string().required("El nombre del recurso es obligatorio"),
    tipoMaterial: Yup.object().shape({
        id: 0,
        nombre: Yup.string()
    }),
    unidadDeMedida: Yup.object().shape({
        id: 0,
        nombre: Yup.string(),
        abreviacion: Yup.string()
    }),
    cantidad: Yup.number().min(0, "Mínimo debe haber 0 cantidades."),
    descripcion: Yup.string()
});