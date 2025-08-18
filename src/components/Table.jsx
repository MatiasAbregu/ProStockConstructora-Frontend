import React, { useState } from "react";
import '../styles/Table.css';
import { NavLink } from "react-router-dom";

export const Table = ({ columnas, datos, columnaEditar, modalHandle, idHandle, stateHandle, eyeurl }) => {
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
                                <th className="colEditar">Editar</th>
                                :
                                <></>
                        }
                    </tr>
                </thead>
                <tbody>
                    {datos ?
                        datos.map((fila, i) => {
                            const id = Object.entries(fila).find(([key]) => key.toLowerCase().startsWith("id"))?.[1];
                            const estado = Object.entries(fila).find(([key]) => key.toLowerCase().startsWith("estado"))?.[1] ? true : false;

                            return (
                                <tr key={i}>
                                    {
                                        Object.entries(fila).map(([identificador, dato], i) => {
                                            if (identificador.startsWith("id") || identificador.startsWith("Id") || identificador.startsWith("ID") ||
                                                identificador.includes("Id"))
                                                return (<></>);
                                            if (dato == null) return (<td key={i}>---</td>)
                                            return (<td key={i}>{dato}</td>);
                                        })
                                    }
                                    {
                                        columnaEditar ?
                                            <td className="tablaFilaEditar" >
                                                {
                                                    eyeurl ?
                                                        <NavLink to={eyeurl} title="Ver detalles">
                                                            <span className="material-symbols-outlined seeButton" >
                                                                visibility
                                                            </span>
                                                        </NavLink> : undefined
                                                }
                                                <span className="material-symbols-outlined editButton" title="Editar" onClick={() => {
                                                    modalHandle(true);
                                                    idHandle(id);
                                                }}>edit_square</span>
                                                <span className="material-symbols-outlined disableButton" onClick={() => {
                                                    stateHandle(id);
                                                }}>{estado ? "do_not_disturb_on" : "add_circle"}</span>
                                                <span className="material-symbols-outlined deleteButton" title="Eliminar">
                                                    delete
                                                </span>
                                            </td>
                                            :
                                            <></>
                                    }
                                </tr>
                            )
                        }
                        ) : <></>}
                </tbody>
            </table>
        </article>
    );
}