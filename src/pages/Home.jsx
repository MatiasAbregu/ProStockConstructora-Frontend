import { useEffect, useState } from "react";
import "../styles/Home.css";
import { Sidebar } from "../components/Sidebar";
// import { ButtonMenu } from "../components/ButtonMenu";
import { Table } from "../components/Table";


import ButtonMany from "./ButtonMany";
import { LogOut } from "../components/LogOut";

export const Home = () => {

  const [opciones, setOpciones] = useState(0)

  useEffect(() => {
    document.title = "Inicio - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="Home">
        <LogOut />
        <div className="upPart">
          <h1>Pedidos pendientes:</h1>
          <ButtonMany setOpciones={setOpciones}></ButtonMany>
        </div>
        {
          opciones == 0 ?
            <Table
              columnas={["Código - Nombre - Empresa", "Estado"]}
              datos={[
                {
                  codigo: "1 - Parque Industrial Norte / G.C.Construcciones",
                  estado: "En curso",
                },
                {
                  codigo: "2 - Proyecto Oasis XXI / MURO Arquitectos",
                  estado: "Finalizada",
                },
                {
                  codigo: "3 - Edificio Central / Constructora ABC",
                  estado: "En pausa",
                },
              ]}
            /> : opciones == 1 ?
              <Table datos={[{
                "codigo": "01-Cemento-Loma Negra",
                "Unidad": "Kg",
              }, {
                "codigo": "02-Arena-Holmic",
                "unidad": "Kg",
              }
              ]} columnas={["Codigo - Nombre - Marca", "Unidad"]} /> :
              undefined
        }
      </section>
    </>
  );
};
