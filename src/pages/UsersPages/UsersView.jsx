import React, { useEffect, useState } from "react";
import { BotonAnadir } from "../../components/BotonAnadir";
import { BotonBuscar } from "../../components/BotonBuscar";
import { Table } from "../../components/Table";
import { Sidebar } from "../../components/Sidebar";
import { LogOut } from "../../components/LogOut";
import { Navigate } from "react-router-dom";

import '../../styles/Users.css';
import '../../styles/Modal.css';
import UsuarioServicio from "../../services/UsuarioServicio";
import { Form } from "../../components/Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import CrearUsuarioYUP from "../../schemas/CrearUsuarioYUP";
import InputControl from "../../validation/InputControl";
import EmpresaServicio from "../../services/EmpresaServicio";

export const UsersView = () => {

    const [rol, setRol] = useState("Administrador"); // Cambiar rol a Admin desde acá 
    const [datos, setDatos] = useState([]);
    const [rolesBBDD, setRolesBBDD] = useState([]);

    const [modal, setModal] = useState(false);

    const [alertMSGAPI, setAlertMSGAPI] = useState(false);
    const [resultAPI, setResultAPI] = useState();

    const [idUpdate, setIdUpdate] = useState(0);
    const [alertWithoutModal, setAlertWithoutModal] = useState(false);

    useEffect(() => {
        document.title = "Usuarios - ProStockConstructora";

        const rootDiv = document.getElementById("root");
        rootDiv.className = "pagedivided";
    }, []);

    useEffect(() => {
        if (rol == "Superadministrador") {
            UsuarioServicio.ObtenerAdministradores().then(datos => { setDatos(datos.data); });
            EmpresaServicio.obtenerEmpresasAAsociar().then(datos => { setDatosEmpresas(datos.data); });
        } else if (rol == "Administrador") {
            UsuarioServicio.ObtenerUsuariosEmpresa(1).then(datos => { setDatos(datos.data); })
            UsuarioServicio.ObtenerRoles().then(datos => { setRolesBBDD(datos.data); })
        }
    }, [rol]);

    const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm({ resolver: yupResolver(CrearUsuarioYUP), mode: "onChange" });

    // MODAL
    const onSubmit = () => {
        if (idUpdate == 0) CrearUsuario(d);
        else ActualizaEmpresa(d);
    }

    const CrearUsuario = (datos) => {
        if (rol == "Superadministrador") {
            UsuarioServicio.CrearUsuario(datos).then(d => {
                setAlertMSGAPI(true);
                setResultAPI(d.data);
            }).catch(e => {
                setAlertMSGAPI(true);
                setResultAPI("Error:" + e.response.data);
            });
        }
    }

    const CerrarModal = () => {
        setModal(false);
        if (idUpdate != 0 || !resultAPI.includes("Error")) reset();
        //if (!resultAPI.includes("Error")) RecargarTabla();
        setIdUpdate(0);
    }

    return (
        <>
            {
                modal ?
                    <Form title={idUpdate == 0 ? "Registrar usuario" : "Actualizar usuario"}
                        buttonMsg={idUpdate == 0 ? "Añadir usuario" : "Actualizar usuario"}
                        handleSubmit={handleSubmit(onSubmit)} closeModal={CerrarModal}
                        // setAlertMSGAPI={setAlertMSGAPI} alertMSGAPI={alertMSGAPI} resultAPI={resultAPI}
                        inputs={[
                            {
                                "type": "text",
                                "required": true,
                                "icon": "person",
                                "register": register,
                                "registerData": "NombreUsuario",
                                "errors": errors,
                                "keyHandle": e => InputControl.sinCaracteresEspeciales(e),
                                "info": "Ingrese el nombre de usuario:"
                            },
                            {
                                "type": "email",
                                "icon": "mail",
                                "register": register,
                                "registerData": "Email",
                                "errors": errors,
                                "info": "Ingrese el email(opcional):"
                            },
                            {
                                "type": "tel",
                                "icon": "call",
                                "register": register,
                                "registerData": "Celular",
                                "errors": errors,
                                "info": "Ingrese el teléfono (opcional):"
                            },
                            {
                                "type": "select",
                                "select": rolesBBDD,
                                "required": true,
                                "icon": "assignment_ind",
                                "info": "Asigne a este usuario su rol:"
                            }
                        ]}
                    />
                    :
                    <></>
            }
            <Sidebar />
            <section className="Users">
                <>
                    {
                        rol == "Administrador" ?
                            <>
                                <LogOut />
                                <div className="upPart">
                                    <BotonBuscar>Buscar</BotonBuscar>
                                    <BotonAnadir setOnClick={() => setModal(true)}>Añadir usuario</BotonAnadir>
                                </div>
                                <Table
                                    columnas={["Nombre de usuario", "Estado", "Rol"]}
                                    opciones={["contacto", "editar", "desactivar"]}
                                    datos={datos}
                                    camposAExcluir={["id", "email", "telefono"]}
                                /></> : <Navigate to={"/not-access"} />
                    }
                </>
            </section>
        </>
    );
}


/// OLD CODE
// rol == "Superadministrador" ?
//     <>
//         <LogOut />
//         <div className="upPart">
//             <BotonBuscar>Buscar</BotonBuscar>
//             <BotonAnadir setOnClick={() => setModal(true)}>Añadir administrador</BotonAnadir>
//         </div>
//         <Table
//             columnas={["Nombre de usuario", "Email", "Teléfono", "Estado", "Empresa"]}
//             columnaEditar={true}
//             datos={datos}
//         />
//     </>
//     : 