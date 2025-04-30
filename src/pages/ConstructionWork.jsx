import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { ButtonMenu } from "../components/ButtonMenu";

export const ConstructionWork = () => {
  useEffect(() => {
    document.title = "Obras - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="ConstructionWork">
        <h1>Obras</h1>
        <p>Esta es la página de obras.</p>
        <ButtonMenu url={""} img={""} desc={""}>
          Obras
        </ButtonMenu>
      </section>
    </>
  );
};
