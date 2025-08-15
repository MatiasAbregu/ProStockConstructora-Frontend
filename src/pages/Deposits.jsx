import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { ButtonMenu } from "../components/ButtonMenu";
import { Table } from "../components/Table";
import "../styles/Deposits.css";



export const Deposits = () => {
  useEffect(() => {
    document.title = "Depósitos - ProStockConstructora";
   
    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  const [modal, setModal] = useState(false);
  const [idUpdate, setIdUpdate] = useState(0);
  
  return (
    <>
      <Sidebar />
      <section className="Deposits">
        <h2>Administrar Depósitos: Obra Pepe</h2>
        <Table
          columnas={["Codigo - tipo Deposito"]}
          columnaEditar={true} eyeurl={"/materials"}
          datos={[
            {
              "Codigo": "DEP001- Buen estado",
              
            },
            {
              "Codigo": "DEP002- En Uso",
              
            },
            {
              "Codigo": "DEP003- Desechos",
              
            }

        ]}
      />
      </section>
    </>
  );
};
