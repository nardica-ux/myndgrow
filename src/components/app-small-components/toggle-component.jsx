import React from "react";
import "./toggle.scss";

const ToggleThing = ({
  state,
  toggleShow,
  size,
  float = "",
  label = "",
  name = "",
}) => {
  return (
    <label
      htmlFor={name}
      className={size === "small" ? "switch-small" : "switch"}
      style={{ marginRight: 12, float, display: "block" }}
    >
      {label}
      <input type="checkbox" onChange={() => toggleShow(!state)} name={name} />
      <span className={`slider${size ? "-" + size : ""} round`}></span>
    </label>
  );
};
export default ToggleThing;
