import React, { useEffect, useState } from 'react'
import '../styles/ModalVerification.css';

export const ModalVerification = ({ id, pregunta, setId, successHandle }) => {

    const [modalForm, setModalForm] = useState(false);

    useEffect(() => {
        setTimeout(() => setModalForm(true), 500);
    }, []);

    return (
        <div className="modalVerification">
            {
                modalForm ?
                    <div className='containerModal'>
                        <h3>{pregunta}</h3>
                        <div>
                            <button className='btn-cancel' onClick={() => setId(0)}>Cancelar</button>
                            <button className='btn-accept' onClick={successHandle}>Aceptar</button>
                        </div>
                    </div> : undefined
            }
        </div>
    )
}
