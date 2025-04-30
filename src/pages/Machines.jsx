import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { ButtonMenu } from "../components/ButtonMenu";

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
        <h1>Máquinas</h1>
        <p>Esta es la página de máquinas.</p>
        <ButtonMenu url={""} img={""} desc={""}>
          Maquinas
        </ButtonMenu>
      </section>
    </>
  );
};
