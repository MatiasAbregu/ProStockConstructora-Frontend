import React from "react";
import "../styles/ButtonOwn.css";
import { Link } from "react-router-dom";

export const ButtonOwn = ({ url, children, desc }) => {
  return (
    <Link to={url} className="btnown">
      <div className="btnown_container">
        <div className="btnown_img">{children}</div>
        <div className="btnown_desc">{desc}</div>
      </div>
      <div className="btnown_hover"></div>
    </Link>
  );
};
