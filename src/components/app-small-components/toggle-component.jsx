import React from "react";
import "./toggle.scss";

const ToggleThing = ({
  state,
  toggleShow,
  size,
  label = "",
  name = "",
  status = "",
  margin,
}) => (
  <div style={{ display: "flex", justifyContent: "center", margin }}>
    <span style={{ marginRight: 12 }}> {label} </span>
    <label className={size === "small" ? "switch-small" : "switch"}>
      <input type="checkbox" onChange={() => toggleShow(!state)} name={name} />
      <span className={`slider${size ? "-" + size : ""} round`}></span>
    </label>
    <span style={{ marginLeft: 12 }}> {status} </span>
  </div>
);

export default ToggleThing;
