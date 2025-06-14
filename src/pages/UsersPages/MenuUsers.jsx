import { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { ButtonMenu } from "../../components/ButtonMenu";
import '../../styles/Users.css';
import { Navigate } from "react-router-dom";

export const MenuUsers = () => {

    const [rol, setRol] = useState("Superadministrador");

    useEffect(() => {
        document.title = "Usuarios - ProStockConstructora";

        const rootDiv = document.getElementById("root");
        rootDiv.className = "pagedivided";
    }, []);

    return (
        <>
            <Sidebar />
            <section className="Users">
                {
                    rol == "Superadministrador" ?
                        <>
                            <ButtonMenu url={"/users/users-view"} img={"https://plus.unsplash.com/premium_photo-1663050989555-f8d01ac54a27?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}>
                                Gestionar usuarios de mi empresa
                            </ButtonMenu>
                            <ButtonMenu url={"/users/users-view"}
                            img={"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RW1wcmVzYXxlbnwwfHwwfHx8MA%3D%3D"}>
                                Gestionar administradores de cada empresa
                            </ButtonMenu>
                        </> : rol == "Administrador" ? <Navigate to={"/users/users-view"} replace/> : <Navigate to={"/not-access"} replace/>
                }
            </section>
        </>
    );
}