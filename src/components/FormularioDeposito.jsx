import React, { useState } from "react";
import '../styles/FormularioDeposito.css';

export const FormularioDeposito = ({ onClose }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [capacidad, setCapacidad] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Depósito agregado:", { nombre, direccion, capacidad });
    onClose(); // cierra el formulario
  };

  return (
    <div className="form-container">
      <h3>Agregar Depósito</h3>
      <form onSubmit={handleSubmit}>
        <label>Nombre del depósito:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Dirección:</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />

        <label>Capacidad:</label>
        <input
          type="number"
          value={capacidad}
          onChange={(e) => setCapacidad(e.target.value)}
          required
        />

        <div className="botones">
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};