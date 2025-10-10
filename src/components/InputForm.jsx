import React, { useEffect, useState } from "react";
import '../styles/InputForm.css';

export const InputForm = ({ children, typeInput, required, placeholder, icon, select, register, registerData, errorsHandle, keyHandle, visual }) => {

    const [visualValue, setVisualValue] = useState("");

    useEffect(() => { setVisualValue(visual) }, [visual]);

    if (!select) {
        return (
            <div className="inputFormContainer">
                <label>{children}</label>
                {
                    !visual ?
                        <>
                            <div>
                                {icon ? <span className="material-symbols-outlined">{icon}</span> : <></>}
                                <input type={typeInput} {...(typeof register == "function" ? register(registerData) : {})}
                                    placeholder={placeholder} required={required} className={`${icon ? "withIcon" : ""}${errorsHandle && errorsHandle[registerData]?.message ? "ierror" : ""}`} onKeyDown={keyHandle} />
                            </div>
                            {errorsHandle && errorsHandle[registerData]?.message ? <p className="error">{errorsHandle[registerData].message}</p> : <></>}
                        </>
                        :
                        <>
                            <div>
                                {icon ? <span className="material-symbols-outlined">{icon}</span> : <></>}
                                <input type={typeInput} required={required} {...(typeof register == "function" ? register(registerData) : {})} className={`${icon ? "withIcon" : ""}`} onKeyDown={keyHandle} readOnly />
                            </div>
                        </>
                }
            </div>
        );
    } else {
        return (
            <div className="inputFormContainer">
                <label>{children}</label>
                <div>
                    {icon ? <span className="material-symbols-outlined">{icon}</span> : <></>}
                    <select className={`${icon ? "withIcon" : ""} ${errorsHandle && errorsHandle[registerData]?.message ? "ierror" : ""}`}
                        {...(typeof register == "function" ? register(registerData) : {})}>
                        {
                            typeof select[0] == "object" && select[0] != null ?
                                select.map((d, i) => (
                                    <option key={i} value={Object.values(d)[0]}>{Object.values(d)[1]}</option>
                                ))
                                :
                                select.map((d, i) => (
                                    <option key={i} value={d}>{d}</option>
                                ))
                        }
                    </select>
                </div>
                {errorsHandle && errorsHandle[registerData]?.message ? <p className="error">{errorsHandle[registerData].message}</p> : <></>}
            </div>
        );
    }
}