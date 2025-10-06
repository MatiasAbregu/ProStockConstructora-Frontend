import { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { ButtonMenu } from "../../components/ButtonMenu";
import '../../styles/Users.css';
import { Navigate } from "react-router-dom";

export const MenuUsers = () => {

    const [rol, setRol] = useState("Administrador");

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
                    rol == "Administrador" ? <Navigate to={"/users/users-view"} replace /> : <Navigate to={"/not-access"} replace />
                }
            </section>
        </>
    );
}