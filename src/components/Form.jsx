import React from "react";
import { InputForm } from "./InputForm";

export const Form = ({ title, buttonMsg, inputs, handleSubmit, closeModal }) => {
    return (
        <form onSubmit={handleSubmit}>
            <span onClick={closeModal} className="btnClose">X</span>
            <h3>{title}</h3>
            <div className="containerItemsForm">
                {
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
                }
            </div>
            <button type="submit">{buttonMsg}</button>
        </form>
    );
}