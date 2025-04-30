import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { ButtonMenu } from "../components/ButtonMenu";
import "../styles/Materials.css";

export const Materials = () => {
  useEffect(() => {
    document.title = "Materiales - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="Materials">
        <h1>Materiales</h1>
        <p>Esta es la página de materiales.</p>
        <ButtonMenu url={""} img={""} desc={""}>
          Materiales
        </ButtonMenu>
      </section>
    </>
  );
};
