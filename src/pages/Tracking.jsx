import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { ButtonMenu } from "../components/ButtonMenu";

export const Tracking = () => {
  useEffect(() => {
    document.title = "Seguimiento - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="Tracking">
        <h1>Seguimiento</h1>
        <p>Esta es la página de seguimiento.</p>
        <ButtonMenu ur={""} img={""} desc={""}>
          Seguimiento
        </ButtonMenu>
      </section>
    </>
  );
};
