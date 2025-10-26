import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import { Form } from "../components/Form";
import { LogOut } from '../components/LogOut';
import "../styles/ConstructionWork.css";
import "../styles/Table.css";
import ObraServicio from "../services/ObraServicio";

export const ConstructionWork = () => {

  const [modal, setModal] = useState(false);
  const [datos, setDatos] = useState();
  const [empresaId, setEmpresaId] = useState(1);

  useEffect(() => {
    document.title = "Obras - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";

    RecargarTabla();
  }, []);

  const RecargarTabla = () => {
    ObraServicio.obtenerObras(empresaId)
      .then(d => setDatos(d.data))
      .catch(e => console.log(e));
  }

  return (
    <>
      {
        modal ?
          <Form title={"Añadir obra"} buttonMsg={"Añadir"} closeModal={function () { setModal(false) }} inputs={[
            {
              "type": "text",
              "info": "Código de la obra",
              "required": true
            },
            {
              "type": "text",
              "info": "Nombre de la obra",
              "required": true
            },
            {
              "type": "text",
              "info": "Empresa responsable",
              "required": true
            },
            {
              "type": "select",
              "info": "Estado de la obra",
              "select": ["En curso", "En pausa", "Finalizada", "Cancelada"],
              "required": true
            }
          ]}></Form> : <></>
      }

      <Sidebar />
      <section className="ConstructionWork">
        <LogOut />
        <BotonAnadir setOnClick={() => setModal(true)}>Añadir obra</BotonAnadir>
        <Table
          columnas={["Código - Nombre - Empresa", "Estado"]}
          opciones={[{ eye: "/deposits" }, "editar", "eliminar"]}
          camposAExcluir={["empresaId"]}
          datos={datos}
        />
      </section>
    </>
  );
};
