import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { ButtonMenu } from "../components/ButtonMenu";

export const Deposits = () => {
  useEffect(() => {
    document.title = "Depósitos - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="Deposits">
        <h1>Depósitos</h1>
        <p>Esta es la página de depósitos.</p>
        <ButtonMenu url={""} img={""} desc={""}>
          Depositos
        </ButtonMenu>
      </section>
    </>
  );
};
