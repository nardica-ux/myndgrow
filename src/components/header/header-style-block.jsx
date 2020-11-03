import React from "react";
import logo from "./mynd-grow-logo.png";

const HeaderStyleBlock = ({ open, compact }) => (
  <div className="header-style-block">
    <h2> MyndGrow </h2>
    {!compact || open ? (
      <img
        src={logo}
        style={{ marginLeft: -20 }}
        alt={"myndGrow logo"}
        className="header-logo"
      />
    ) : null}
  </div>
);

export default HeaderStyleBlock;
