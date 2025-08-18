import React from "react";

import { useEffect, useState } from "react";

export const BotonVolver = ({ onClick }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        isVisible && (
            <button className="btnVolver" onClick={onClick}>
                <span className="material-symbols-outlined">arrow_back</span> Volver
            </button>
        )
    );
}