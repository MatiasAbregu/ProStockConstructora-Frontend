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

export const UsersView = () => {

    const [rol, setRol] = useState("Superadministrador");
    const [datos, setDatos] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        document.title = "Usuarios - ProStockConstructora";

        const rootDiv = document.getElementById("root");
        rootDiv.className = "pagedivided";
    }, []);

    useEffect(() => {
        if (rol == "Superadministrador") {
            UsuarioServicio.ObtenerAdministradores().then(datos => { setDatos(datos.data); console.log(datos.data); });
        }
    }, [rol]);

    return (
        <>
            {
                modal ?
                    <div className="modalBack">
                        <form>
                            <span onClick={() => setModal(false)} className="btnClose">X</span>
                            <h3>Registrar administrador</h3>
                            <InputForm typeInput={"text"} required={true} icon={"person"}>
                                Ingrese el nombre de usuario:
                            </InputForm>
                            <InputForm typeInput={"email"} required={true} icon={"mail"}>
                                Ingrese el email (opcional):
                            </InputForm>
                            <InputForm typeInput={"tel"} required={true} icon={"call"}>
                                Ingrese el teléfono (opcional):
                            </InputForm>
                            <InputForm select={["Algorry Studios", "ProStock", "Pepe Company"]} icon={"domain"}>
                                Asocie este administrador a una empresa:
                            </InputForm>
                            <button type="submit">Crear administrador</button>
                        </form>
                    </div>
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