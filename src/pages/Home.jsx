import { useEffect } from "react";
import "../styles/Home.css";
import { Sidebar } from "../components/Sidebar";
import { ButtonMenu } from "../components/ButtonMenu";

export const Home = () => {
  useEffect(() => {
    document.title = "Inicio - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.classList.add("homepage");
  }, []);

  return (
    <>
      <Sidebar />
      <section className="Home">
        <ButtonMenu
          url={"/materials"}
          img={
            "https://plus.unsplash.com/premium_photo-1677529102591-a098b37b925c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hdGVyaWFsc3xlbnwwfHwwfHx8MA%3D%3D"
          }
          desc={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem delectus quisquam voluptatem libero officiis facilis necessitatibus hic explicabo laboriosam in."
          }
        >
          Materiales
        </ButtonMenu>

        <ButtonMenu
          url={"/machines"}
          img={
            "https://plus.unsplash.com/premium_photo-1682144435143-97c426ff3a77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3JhbmV8ZW58MHx8MHx8fDA%3D"
          }
          desc={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem delectus quisquam voluptatem libero officiis facilis necessitatibus hic explicabo laboriosam in."
          }
        >
          Maquinarias
        </ButtonMenu>

        <ButtonMenu
          url={"/tracking"}
          img={
            "https://plus.unsplash.com/premium_photo-1661932036915-4fd90bec6e8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29udGFpbmVyfGVufDB8fDB8fHww"
          }
          desc={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem delectus quisquam voluptatem libero officiis facilis necessitatibus hic explicabo laboriosam in."
          }
        >
          Pedidos
        </ButtonMenu>

        <ButtonMenu
          url={"/deposits"}
          img={
            "https://plus.unsplash.com/premium_photo-1663040001568-f07cab70d71f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FyZWhvdXNlfGVufDB8fDB8fHww"
          }
          desc={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem delectus quisquam voluptatem libero officiis facilis necessitatibus hic explicabo laboriosam in."
          }
        >
          Depósitos
        </ButtonMenu>

        <ButtonMenu
          url={"/construction-work"}
          img={
            "https://plus.unsplash.com/premium_photo-1681691911660-a40d4163ed9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29uc3RydWN0aW9uJTIwd29ya3xlbnwwfHwwfHx8MA%3D%3D"
          }
          desc={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem delectus quisquam voluptatem libero officiis facilis necessitatibus hic explicabo laboriosam in."
          }
        >
          Obras
        </ButtonMenu>

        <ButtonMenu
          url={"/enterprises"}
          img={
            "https://plus.unsplash.com/premium_photo-1661371394983-42485fed3a58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFuZHNoYWtlfGVufDB8fDB8fHww"
          }
          desc={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem delectus quisquam voluptatem libero officiis facilis necessitatibus hic explicabo laboriosam in."
          }
        >
          Empresas
        </ButtonMenu>

        <ButtonMenu
          url={"/stadistics"}
          img={
            "https://plus.unsplash.com/premium_photo-1661431121792-81fa2b971d0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3RhZGlzdGljc3xlbnwwfHwwfHx8MA%3D%3D"
          }
          desc={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem delectus quisquam voluptatem libero officiis facilis necessitatibus hic explicabo laboriosam in."
          }
        >
          Estadisticas
        </ButtonMenu>
      </section>
    </>
  );
};
