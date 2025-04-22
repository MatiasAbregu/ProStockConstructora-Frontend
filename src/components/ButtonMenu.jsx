import React from "react";
import "../styles/ButtonMenu.css";
import { Link } from "react-router-dom";

export const ButtonMenu = ({ url, img, children, desc }) => {
  return (
    <Link to={url} className="btn-mio">
      <div className="containerImg">
        <img src={img} />
      </div>
      <div>
        <h3>{children}</h3>
        <p>{desc}</p>
      </div>
    </Link>
  );
};
