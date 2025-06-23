import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import "../styles/Machines.css";
import "../styles/Table.css";

export const Machines = () => {
  useEffect(() => {
    document.title = "Maquinaria - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="Machines">
      <h1>Administración General de Máquinas:</h1>
        <BotonAnadir>Añadir maquinaria</BotonAnadir>
        <Table
          columnas={["Código", "Nombre", "Descripción", "Disponibilidad"]}
          columnaEditar={true}
          datos={[
            {
              codigo: "ExC_01",
              nombre: "Excavadora",
              descripcion:
                "Máquina pesada utilizada para excavar y mover tierra.",
              disponibilidad: "si",
            },
            {
              codigo: "Bul_02",
              nombre: "Bulldozer",
              descripcion:
                "Vehículo de construcción con una gran hoja frontal para mover materiales.",
              disponibilidad: "si",
            },
            {
              codigo: "Gru_03",
              nombre: "Grúa",
              descripcion:
                "Máquina utilizada para levantar y mover objetos pesados.",
              disponibilidad: "no",
            },
            {
              codigo: "Ret_04",
              nombre: "Retroexcavadora",
              descripcion:
                "Máquina que combina las funciones de una excavadora y un cargador frontal.",
              disponibilidad: "si",
            },
          ]}
        />
      </section>
    </>
  );
};
