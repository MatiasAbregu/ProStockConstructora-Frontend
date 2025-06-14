import React from "react";
import "../styles/ButtonMenu.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const ButtonMenu = ({ url, img, children, desc}) => {
 
  const MotionLink = motion(Link);
 
  return (
    <MotionLink to={url} className="btn-mio"
    initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0, transition: {duration: 0.8}}} 
     whileHover={{scale: 1.08, transition: {duration: 0.1}}} viewport={{once: false}}>
      <div className="containerImg">
        <img src={img} />
      </div>
      <div>
        <h3>{children}</h3>
        <p>{desc}</p>
      </div>
    </MotionLink>
  );
};
