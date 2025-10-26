import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import "../styles/Deposits.css";
import { LogOut } from '../components/LogOut';

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
        <LogOut />
        <h2>Administrar Depósitos: Obra Pepe</h2>
        <Table
          columnas={["Codigo - tipo Deposito"]}
          opciones={[{eye: "/materials"}, "editar", "eliminar"]}
          camposAExcluir={["id"]}
          datos={[
            {
              "id": 1,
              "Codigo": "DEP001- Buen estado",           
            },
            {
              "id": 2,
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
