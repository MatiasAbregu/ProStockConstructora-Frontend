import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../styles/ButtonMany.css";

function ButtonMany({setOpciones}) {

  const cambiaropcion=(opcion) => {
    setOpciones(opcion.target.value)
  }
        
  return (
    <>
       <div className="Button-container">
          <select className="buttonmany" onChange={(e)=>cambiaropcion(e)
          }>
            <option value="0">Varios</option>
            <option value="1">Materiales</option>
            <option value="2">Maquinarias</option>
            <option value="3">Empresas</option>
          </select>
       </div> 
    </>
  )
}
export default ButtonMany;