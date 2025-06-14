import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import { BotonBuscar } from "../components/BotonBuscar";
import { InputForm } from "../components/InputForm";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import '../styles/Empresas.css';
import '../styles/Modal.css';
import EmpresaServicio from "../services/EmpresaServicio";
import EmpresaYUP from "../schemas/EmpresaYUP";

export const Enterprises = () => {

  const [rol, setRol] = useState("Superadministrador");
  const [datos, setDatos] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    document.title = "Empresas - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  useEffect(() => {
    if (rol == "Superadministrador") {
      EmpresaServicio.obtenerEmpresas().then(datos => { setDatos(datos.data); console.log(datos.data); });
    }
  }, [rol]);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(EmpresaYUP), mode: "onChange"})

  return (
    <>
      {
        modal ?
          <div className="modalBack">
            <form onSubmit={handleSubmit((d) => console.log(d))}>
              <span onClick={() => setModal(false)} className="btnClose">X</span>
              <h3>Registrar empresa</h3>
              <div className="containerItemsForm">
                <InputForm typeInput={"text"} required={true} icon={"domain"} register={register} registerData={"NombreEmpresa"} errorsHandle={errors}>
                  Ingrese el nombre de la empresa:
                </InputForm>
                <InputForm typeInput={"text"} required={true} icon={"description"} register={register} registerData={"CUIT"} errorsHandle={errors}>
                  Ingrese el CUIT:
                </InputForm>
                <InputForm select={["Sociedad de Responsabilidad Limitada (S.R.L.)", "Sociedad Anónima (S.A.)", "Sociedad por Acciones Simplificada (S.A.S.)"]} icon={"balance"} register={register} registerData={"RazonSocial"} errorsHandle={errors}>
                  Ingrese la razón social:
                </InputForm>
                <InputForm typeInput={"tel"} icon={"call"} register={register} registerData={"Celular"} errorsHandle={errors}>
                  Ingrese el teléfono (opcional):
                </InputForm>
                <InputForm typeInput={"email"} icon={"mail"} register={register} registerData={"Email"} errorsHandle={errors}>
                  Ingrese el email (opcional):
                </InputForm>
              </div>
              <button type="submit">Añadir empresa</button>
            </form>
          </div>
          :
          <></>
      }
      <Sidebar />
      <section className="Enterprises">
        <BotonBuscar>Buscar</BotonBuscar>
        <BotonAnadir setOnClick={() => setModal(true)}>Añadir empresa</BotonAnadir>
        <Table
          columnas={["Nombre", "CUIT", "Razón social", "Estado", "Email", "Teléfono"]}
          columnaEditar={true}
          datos={datos}
        />
      </section>
    </>
  );
};
