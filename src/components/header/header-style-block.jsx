import React from "react";
import logo from "./mynd-grow-logo.png";
import style from "./header.module.scss";

const HeaderStyleBlock = ({ open, compact }) => (
  <div className={style.header_style_block}>
    <h2> MyndGrow </h2>
    {!compact || open ? <img src={logo} alt={"myndGrow logo"} /> : null}
  </div>
);

export default HeaderStyleBlock;
