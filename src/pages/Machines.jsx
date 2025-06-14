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
        <table>
          <tr>
            <th>Col 1</th>
            <th>Col 2</th>
            <th>Col 3</th>
            <th>Col 4</th>
            <th>Col 5</th>
            <th>Col 6</th>
          </tr>
          <tr>
            <td>Dato 1</td>
            <td>Dato 2</td>
            <td>Dato 3</td>
            <td>Dato 4</td>
            <td>Dato 5</td>
            <td>Dato 6</td>
          </tr>
          <tr>
            <td>Dato 1</td>
            <td>Dato 2</td>
            <td>Dato 3</td>
            <td>Dato 4</td>
            <td>Dato 5</td>
            <td>Dato 6</td>
          </tr>
        </table>
      </section>
    </>
  );
};
