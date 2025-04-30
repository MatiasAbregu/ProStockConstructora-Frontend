import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { ButtonMenu } from "../components/ButtonMenu";

export const Enterprises = () => {
  useEffect(() => {
    document.title = "Empresas - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="Enterprises">
        <h1>Empresas</h1>
        <p>Esta es la página de empresas.</p>
        <ButtonMenu url={""} img={""} desc={""}>
          Empresas
        </ButtonMenu>
      </section>
    </>
  );
};
