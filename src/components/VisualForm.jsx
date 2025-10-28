import React, { useEffect, useState } from "react";
import { InputForm } from "./InputForm";
import '../styles/Form.css';

export const VisualForm = ({ title, inputs, closeModal }) => {

    const [modalForm, setModalForm] = useState(false);

    useEffect(() => {
        setTimeout(() => setModalForm(true), 500);
    }, []);

    return (
        <div className="modalBack visualModal">
            {
                modalForm ?
                    <form>
                        <span onClick={closeModal} className="btnClose">X</span>
                        <h3>{title}</h3>
                        <div className="containerItemsForm">
                            {
                                inputs ?
                                    inputs.map((input, i) => {
                                        if (input.type != "select") {
                                            return (
                                                <InputForm typeInput={input.type} required={input.required} icon={input.icon}
                                                    keyHandle={input.keyHandle} register={input.register} 
                                                    registerData={input.registerData} key={i} visual={true}>
                                                    {input.info}
                                                </InputForm>
                                            );
                                        } else {
                                            return (
                                                <InputForm select={input.select} icon={input.icon} key={i}>
                                                    {input.info}
                                                </InputForm>
                                            );
                                        }
                                    })
                                    : null
                            }
                        </div>
                    </form> : <></>
            }
        </div>
    );
}