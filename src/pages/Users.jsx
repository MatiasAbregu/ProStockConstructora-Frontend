import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { ButtonMenu } from "../components/ButtonMenu";
import '../styles/Users.css';
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";

export const Users = () => {

    const [rol, setRol] = useState("Admin");

    useEffect(() => {
        document.title = "Usuarios - ProStockConstructora";

        const rootDiv = document.getElementById("root");
        rootDiv.className = "pagedivided";
    }, []);

    // Aparecer botones en caso de superadministrador
    return (
        <>
            <Sidebar />
            <section className="Users">
                {
                    rol == "Superadmin" ?
                        <>
                            <ButtonMenu url={""} img={""} desc={""}>
                                Gestionar usuarios de mi empresa
                            </ButtonMenu>
                            <ButtonMenu url={""} img={""} desc={""}>
                                Gestionar administradores de cada empresa
                            </ButtonMenu>
                        </> :
                        <>
                            <BotonAnadir>Añadir usuario</BotonAnadir>
                            <Table
                                columnas={["Código", "Nombre de usuario", "Rol", "Estado"]}
                                columnaEditar={true}
                                peticionURL={"/datosUsuario.json"}
                            />
                        </>
                }
            </section>
        </>
    );
}