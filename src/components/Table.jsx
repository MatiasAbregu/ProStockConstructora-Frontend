import React, { useEffect, useState } from "react";
import '../styles/Table.css';
import { NavLink } from "react-router-dom";

export const Table = ({ columnas, datos, camposAExcluir, opciones, modalHandle, idHandle, stateHandle }) => {

    const [enableTABLARESPONSIVA, setEnableTABLARESPONSIVA] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 920) setEnableTABLARESPONSIVA(true);
            else setEnableTABLARESPONSIVA(false);
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    const mapearDatos = () => {
        const Contenedor = enableTABLARESPONSIVA ? "div" : "tr";
        const Contenedor2 = enableTABLARESPONSIVA ? "div" : "td";

        if (datos) {
            return datos.map((fila, i) => {
                const estado = Object.entries(fila).find(([key]) => key.toLowerCase().startsWith("estado"))?.[1] ? true : false;

                return (
                    <Contenedor key={i}>
                        {
                            Object.entries(fila).map(([identificador, dato], i2, longitudArray) => {
                                if (camposAExcluir && camposAExcluir.includes(identificador)) return null;

                                if (dato == null) {
                                    if (enableTABLARESPONSIVA) return (<p key={i2}>---</p>)
                                    else return (<td key={i2}>---</td>)
                                }

                                if(Array.isArray(dato)) dato = dato.join(" - ")
                                if (enableTABLARESPONSIVA) {
                                    if (i == longitudArray.length - 1) return (<p key={i2}>{dato}</p>)
                                    return (<><p key={i2}>{dato}</p> -</>);
                                }
                                else return (<td key={i2}>{dato}</td>);
                            })
                        }
                        {
                            opciones ?
                                <Contenedor2 className="tablaFilaEditar" >
                                    {
                                        opciones.map((value, i3) => {
                                            if (value.eye) {
                                                return (
                                                    <NavLink to={value.eye} title="Ver detalles" key={i3}>
                                                        <span className="material-symbols-outlined seeButton">
                                                            visibility
                                                        </span>
                                                    </NavLink>
                                                )
                                            } else if (value == "editar") {
                                                return (
                                                    <span className="material-symbols-outlined editButton" title="Editar" key={i3} onClick={() => {
                                                        modalHandle(true);
                                                        idHandle(id);
                                                    }}>edit_square</span>
                                                )
                                            } else if (value == "desactivar") {
                                                return (
                                                    <span className="material-symbols-outlined disableButton"
                                                        key={i3} onClick={() => {
                                                            stateHandle(id);
                                                        }}>{estado ? "do_not_disturb_on" : "add_circle"}</span>
                                                )
                                            } else if (value == "eliminar") {
                                                return (
                                                    <span className="material-symbols-outlined deleteButton"
                                                        key={i3} title="Eliminar">
                                                        delete
                                                    </span>
                                                )
                                            } else if (value == "contacto") {
                                                return (
                                                    <span className="material-symbols-outlined contactButton" key={i3}>
                                                        contact_phone
                                                    </span>
                                                )
                                            }
                                        })
                                    }
                                </Contenedor2>
                                :
                                <></>
                        }
                    </Contenedor>
                )
            })
        }
    }

    return (
        <article className="tableArticle">
            {
                !enableTABLARESPONSIVA ?
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
                                    opciones ?
                                        <th className="colEditar">Editar</th>
                                        :
                                        <></>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mapearDatos()
                            }
                        </tbody>
                    </table> :
                    <div>
                        <div className="tablaResponsiva">
                            <div className="encabezado">
                                {
                                    columnas.map((columna, i, longitudArray) => {
                                        if (i == longitudArray.length - 1) return (<p key={i}>{columna}</p>)
                                        else return (<><p key={i}>{columna}</p> -</>)
                                    })
                                }
                            </div>
                            {
                                mapearDatos()
                            }
                        </div>
                    </div>
            }
        </article>
    );
}