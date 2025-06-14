import React from "react";
import '../styles/Table.css';

export const Table = ({ columnas, datos, columnaEditar }) => {
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
                                        <td className="tablaFilaEditar" style={{ minWidth: "120px" }}>
                                            <span className="material-symbols-outlined">edit_square</span>
                                            <span className="material-symbols-outlined">do_not_disturb_on</span>
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