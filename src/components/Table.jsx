import React, { useEffect, useState } from "react";
import '../styles/Table.css';

export const Table = ({ columnas, peticionURL, columnaEditar }) => {

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        if (peticionURL != "") {
            fetch(peticionURL)
                .then(r => r.json())
                .then(datos => {
                    const EncontrarPrimerArreglo = Object.values(datos).find(a => Array.isArray(a));
                    if (EncontrarPrimerArreglo) { setDatos(EncontrarPrimerArreglo); console.log(EncontrarPrimerArreglo); }
                })
                .catch(er => console.log(er))
        }
    }, [peticionURL]);

    return (
        <article className="tableArticle">
            <table>
                <thead>
                    <tr>
                        {
                            columnas.map((columna, i) =>
                            (
                                <th key={i}>{columna}</th>
                            ))
                        }
                        {
                            columnaEditar ?
                                <th>Editar</th>
                                :
                                <></>
                        }
                    </tr>
                </thead>
                <tbody>
                    {datos ?
                        datos.map((fila, i) =>
                        (
                            <tr key={i}>
                                {
                                    Object.values(fila).map((dato, i) => (
                                        <td key={i}>{dato}</td>
                                    ))
                                }
                                {
                                    columnaEditar ?
                                        <td className="tablaFilaEliminar">
                                            <span className="material-symbols-outlined">edit_square</span>
                                            <span className="material-symbols-outlined">task_alt</span>
                                        </td>
                                        :
                                        <></>
                                }
                            </tr>
                        )) : <></>}
                </tbody>
            </table>
        </article>
    );
}