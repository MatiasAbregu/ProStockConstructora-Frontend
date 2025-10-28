import * as Yup from "yup";

export default Yup.object().shape({
    codigoDeposito: Yup.string().required("Es obligatorio este campo."),
    nombreDeposito: Yup.string().required("Es obligatorio este campo."),
    tipoDeposito: Yup.number().required("Es obligatorio este campo."),
    obraId: Yup.number(),
    ubicacion: Yup.object().shape({
        codigoUbicacion: Yup.string().required("Es obligatorio especificar un código."),
        ubicacionDomicilio: Yup.string().required("Es obligatorio indicar ubicación."),
        provincia: Yup.object().shape({
            nombreProvincia: Yup.string().required("Es obligatorio especificar la provincia.")
        })
    })
});