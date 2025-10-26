import React from 'react';
import '../styles/Alert.css';

export const Alert = ({ resultAPI, setAlertWithoutModal }) => {
    return (
        <div className={`alertContainer ${resultAPI.includes("Error") ? "FRerror" : "FRexito"}`}>
            <div>
                <p>{resultAPI.includes("Error:") ? resultAPI.split(":")[1] : resultAPI}</p>
                <span onClick={() => setAlertWithoutModal(false)}>X</span>
            </div>
        </div>
    )
}
