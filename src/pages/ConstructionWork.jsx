import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import { Form } from "../components/Form";
import { LogOut } from '../components/LogOut';
import "../styles/ConstructionWork.css";
import "../styles/Table.css";
import ObraServicio from "../services/ObraServicio";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import CrearObraYUP from "../schemas/CrearObraYUP";

export const ConstructionWork = () => {

  const [modal, setModal] = useState(false);
  const [datos, setDatos] = useState();
  const [empresaId, setEmpresaId] = useState(1);

  const { register, formState: { errors }, handleSubmit, reset, setValue }
    = useForm({ resolver: yupResolver(CrearObraYUP), mode: "onChange" })

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
          <Form title={"Añadir obra"} buttonMsg={"Añadir"} closeModal={() => setModal(false)}
            inputs={[
              {
                "type": "text",
                "info": "Nombre de la obra",
                "required": true,
                "register": register,
                "registerData": "nombreObra",
                "errors": errors
              },
              {
                "type": "select",
                "info": "Estado de la obra",
                "select": [{ v: 0, estado: "En proceso" }, { v: 1, estado: "Pausada" }, { v: 2, estado: "Finalizada" }],
                "required": true,
                "register": register,
                "registerData": "estado",
                "errors": errors
              }
            ]}></Form> : <></>
      }

      <Sidebar />
      <section className="ConstructionWork">
        <LogOut />
        <h1>&nbsp;Gestionar obras</h1>
        <BotonAnadir setOnClick={() => setModal(true)}>Añadir obra</BotonAnadir>
        <Table
          columnas={["Nombre", "Estado"]}
          opciones={[{ eye: "/deposits" }, "editar", "eliminar"]}
          camposAExcluir={["empresaId"]}
          datos={datos}
        />
      </section>
    </>
  );
};
