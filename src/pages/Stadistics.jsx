import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";

export const Stadistics = () => {
  useEffect(() => {
    document.title = "Estadisticas - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="Stadistics">
        <h1>Estadísticas</h1>
      </section>
    </>
  );
};
