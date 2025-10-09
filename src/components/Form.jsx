import React, { useEffect, useState } from "react";
import { InputForm } from "./InputForm";
import '../styles/Form.css';

// alertMSGAPI -> Decide si se muestra o no || setAlertMSGAPI se activa en el formulario principal y se desactiva desde acá
export const Form = ({ title, buttonMsg, inputs, handleSubmit, closeModal }) => {

    const [modalForm, setModalForm] = useState(false);

    useEffect(() => {
        setTimeout(() => setModalForm(true), 500);
    }, []);

    return (
        <div className="modalBack">
            {
                modalForm ?
                    <form onSubmit={handleSubmit}>
                        <span onClick={closeModal} className="btnClose">X</span>
                        <h3>{title}</h3>
                        <div className="containerItemsForm">
                            {
                                inputs ?
                                    inputs.map((input, i) => {
                                        if (input.type != "select") {
                                            return (
                                                <InputForm typeInput={input.type} required={input.required} icon={input.icon}
                                                    register={input.register} registerData={input.registerData} errorsHandle={input.errors}
                                                    keyHandle={input.keyHandle} key={i}>
                                                    {input.info}
                                                </InputForm>
                                            );
                                        } else {
                                            return (
                                                <InputForm select={input.select} icon={input.icon} register={input.register} registerData={input.registerData}
                                                    errorsHandle={input.errorsHandle} key={i}>
                                                    {input.info}
                                                </InputForm>
                                            );
                                        }
                                    })
                                    : null
                            }
                        </div>
                        <button type="submit">{buttonMsg}</button>
                    </form> : <></>
            }
        </div>
    );
}