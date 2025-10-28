import { useEffect, useState } from "react";
import "../styles/Home.css";
import { Sidebar } from "../components/Sidebar";
import { ButtonMenu } from "../components/ButtonMenu";
import { PendingOrders } from "./PendingOrders";
import { Table } from "../components/Table"; 


import ButtonMany from "./ButtonMany";

export const Home = () => {

    const [opciones, setOpciones]= useState(0)



  useEffect(() => {
    document.title = "Inicio - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="Home">
        <h1>Pedidos pendientes:</h1>
        <div className="button-container">
          <ButtonMany setOpciones={setOpciones}></ButtonMany>
        </div>
<<<<<<< HEAD
          {  
          opciones==0?
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
        />: opciones==1?  
        <Table datos={[{
          "codigo":"01-Cemento-Loma Negra",
          "Unidad": "Kg",
        },{ "codigo":"02-Arena-Holcim",
          "unidad":"Kg",

=======
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
                "codigo": "01 - Cemento",
                "Unidad": "Kg",
              }, 
              {
                "codigo": "02 - Arena",
                "unidad": "Kg",
              }
              ]} columnas={["Codigo - Nombre", "Unidad"]} /> :
              undefined
>>>>>>> 1312b355962eb37075b9899c41ed5435d34a7f5e
        }
      
      
      ]} columnaEditar={true} columnas={["Codigo - Nombre - Marca","Unidad"]}/>:
    undefined

         
          
          
          
         }
      </section>
    </>
  );
};
