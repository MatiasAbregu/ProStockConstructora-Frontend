import { useEffect, useState } from "react";
import "../styles/Home.css";
import { Sidebar } from "../components/Sidebar";
import { ButtonMenu } from "../components/ButtonMenu";
import { PendingOrders } from "./PendingOrders";
import { Table } from "../components/Table";


import ButtonMany from "./ButtonMany";
import { LogOut } from "../components/LogOut";
import RecursoServicio from "../services/RecursoServicio";

export const Home = () => {

  const [opciones, setOpciones] = useState(0)
  const [datos, setDatos] = useState()
  const [msjBBDD, setMsjBBDD] = useState()



  useEffect(() => {
    document.title = "Inicio - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";

    RecargarTabla();
  }, []);

  const RecargarTabla = () => {
    RecursoServicio.traerRecursosGeneral(1)
      .then(d => {
        if (typeof d.data == "string") setMsjBBDD(d.data);
        else {
          setDatos(d.data)
          setMsjBBDD("");
        }
      }
      ).catch(e => console.log(e)
      )
  }

  return (
    <>
      <Sidebar />
      <section className="Home">
        <h1>Pedidos pendientes:</h1>
        <div className="button-container">
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
              <>
                {
                  msjBBDD ?
                    <p>{msjBBDD}</p> : <></>
                }
                <Table datos={
                  datos
                }
                  columnas={["Codigo", "Nombre", "Unidad"]} camposAExcluir={["Descripcion"]}/>                  
              </> :
              undefined
        }
      </section>
    </>
  );
};
