import React from "react";
import '../styles/InputForm.css';

export const InputForm = ({ children, typeInput, required, placeholder, icon, select, register, registerData, errorsHandle }) => {
    if (!select) {
        return (
            <div className="inputFormContainer">
                <label>{children}</label>
                <div>
                    {icon ? <span className="material-symbols-outlined">{icon}</span> : <></>}
                    <input type={typeInput} {...(typeof register == "function" ? register(registerData) : {})}
                    placeholder={placeholder} required={required} className={`${icon ? "withIcon" : ""} 
                    ${errorsHandle && errorsHandle[registerData]?.message ? "ierror" : ""}`} />
                </div>
                {errorsHandle && errorsHandle[registerData]?.message ? <p className="error">{errorsHandle[registerData].message}</p> : <></>}
            </div>
        );
    } else {
        return (
            <div className="inputFormContainer">
                <label>{children}</label>
                <div>
                    {icon ? <span className="material-symbols-outlined">{icon}</span> : <></>}
                    <select className={`${icon ? "withIcon" : ""} ${errorsHandle && errorsHandle[registerData]?.message ? "ierror" : ""}`} 
                    {...(typeof register == "function" ? register(registerData): {})}>
                        {
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