import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../styles/Table.css';

export const Table = ({ columnas, datos, camposAExcluir, opciones, modalHandle, idHandle, stateHandle, deleteHandle }) => {

    const [enableTABLARESPONSIVA, setEnableTABLARESPONSIVA] = useState(false);
    const navigate = useNavigate();

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
                const id = fila.id ? fila.id : 0;
                const estado = Object.entries(fila).find(([key]) => key.toLowerCase().startsWith("estado"))?.[1]
                    == "Activo" ? true : false;

                return (
                    <Contenedor key={i}>
                        {
                            Object.entries(fila).map(([identificador, dato], i2, longitudArray) => {
                                if (camposAExcluir && camposAExcluir.includes(identificador)) return null;

                                if (dato == null) {
                                    if (enableTABLARESPONSIVA) return (<p key={i2}>---</p>)
                                    else return (<td key={i2}>---</td>)
                                }

                                //if (Array.isArray(dato)) dato = dato.join(" - ")
                                if (enableTABLARESPONSIVA) {
                                    if (i2 == (longitudArray.length - camposAExcluir.length)) return (<p key={i2}>{dato}</p>)
                                    return (<React.Fragment key={i2}><p>{dato}</p> -</React.Fragment>);
                                }
                                else return (<td key={i2}>{dato}</td>);
                            })
                        }
                        {
                            opciones ?
                                <Contenedor2 className="tablaFilaEditar" >
                                    {
                                        opciones.map((value, i3) => {
                                            if (value.to) {
                                                return (
                                                    <span className="material-symbols-outlined seeButton" key={i3}
                                                        onClick={() => {
                                                            navigate(id && value.to.url.includes(":id") ?
                                                                `${value.to.url.replace(":id", id)}` : value.to.url);
                                                        }} title="Ver detalles">
                                                        {value.to.icon}
                                                    </span>
                                                )
                                            } else if (value == "editar") {
                                                return (
                                                    <span className="material-symbols-outlined editButton" title="Editar" key={i3}
                                                        onClick={() => {
                                                            modalHandle(true);
                                                            idHandle(id);
                                                        }}>edit_square</span>
                                                )
                                            } else if (value == "desactivar") {
                                                return (
                                                    <span className={`material-symbols-outlined 
                                                        ${estado ? "disableButton" : "enableButton"}`}
                                                        key={i3} onClick={() => {
                                                            stateHandle(id);
                                                        }}>{estado ? "do_not_disturb_on" : "add_circle"}</span>
                                                )
                                            } else if (value == "eliminar") {
                                                return (
                                                    <span className="material-symbols-outlined deleteButton"
                                                        key={i3} title="Eliminar" onClick={() => {
                                                            deleteHandle(id);
                                                        }}>
                                                        delete
                                                    </span>
                                                )
                                            } else if (value.contacto) {
                                                return (
                                                    <span className="material-symbols-outlined contactButton" key={i3}
                                                        onClick={() => {
                                                            idHandle(id);
                                                            value.contacto(true)
                                                        }}>
                                                        contact_phone
                                                    </span>
                                                )
                                            } else if (value.location) {
                                                return (
                                                    <span className="material-symbols-outlined locationButton" key={i3}
                                                        onClick={() => {
                                                            idHandle(id);
                                                            value.location(true)
                                                        }}>
                                                        location_on
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
                                        else return (<React.Fragment key={i}><p>{columna}</p> -</React.Fragment>)
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