import React, { useEffect, useState } from "react";
import { BotonAnadir } from "../../components/BotonAnadir";
import { BotonBuscar } from "../../components/BotonBuscar";
import { Table } from "../../components/Table";
import { Sidebar } from "../../components/Sidebar";
import { Navigate } from "react-router-dom";
import { InputForm } from "../../components/InputForm";

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

    const [rol, setRol] = useState("Superadministrador");
    const [datos, setDatos] = useState([]);
    const [datosEmpresas, setDatosEmpresas] = useState([]);

    const [modal, setModal] = useState(false);

    const [idUpdate, setIdUpdate] = useState(0);

    useEffect(() => {
        document.title = "Usuarios - ProStockConstructora";

        const rootDiv = document.getElementById("root");
        rootDiv.className = "pagedivided";
    }, []);

    useEffect(() => {
        if (rol == "Superadministrador") {
            UsuarioServicio.ObtenerAdministradores().then(datos => { setDatos(datos.data); });
            EmpresaServicio.obtenerEmpresasAAsociar().then(datos => { setDatosEmpresas(datos.data); });
        }
    }, [rol]);

    const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm({ resolver: yupResolver(CrearUsuarioYUP), mode: "onChange" });

    // MODAL
    const onSubmit = () => {

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
                                "required": true,
                                "icon": "mail",
                                "register": register,
                                "registerData": "Email",
                                "errors": errors,
                                "info": "Ingrese el email(opcional):"
                            },
                            {
                                "type": "tel",
                                "required": true,
                                "icon": "call",
                                "register": register,
                                "registerData": "Celular",
                                "errors": errors,
                                "info": "Ingrese el teléfono (opcional):"
                            },
                            {
                                "type": "select",
                                "select": datosEmpresas,
                                "icon": "domain",
                                "info": "Asocie este administrador a una empresa:"
                            }
                        ]}
                    />
                    :
                    <></>
            }
            <Sidebar />
            <section className="Users">
                {
                    rol == "Superadministrador" ?
                        <>
                            <BotonBuscar>Buscar</BotonBuscar>
                            <BotonAnadir setOnClick={() => setModal(true)}>Añadir administrador</BotonAnadir>
                            <Table
                                columnas={["Nombre de usuario", "Email", "Teléfono", "Estado", "Empresa"]}
                                columnaEditar={true}
                                datos={datos}
                            />
                        </>
                        : rol == "Administrador" ?
                            <>
                                <BotonAnadir>Añadir usuario</BotonAnadir>
                                <Table
                                    columnas={["Código", "Nombre de usuario", "Empresa", "Rol", "Estado"]}
                                    columnaEditar={true}
                                    datos={datos}
                                /></> : <Navigate to={"/not-access"} />
                }
            </section>
        </>
    );
}