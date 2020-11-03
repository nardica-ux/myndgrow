import React from "react";
import "./toggle.scss";

const ToggleThing = ({ state, toggleShow, size, float }) => {
  return (
    <div>
      <span style={{ marginRight: 12, float }}> text</span>
      <label className={size === "small" ? "switch-small" : "switch"}>
        <input type="checkbox" onChange={() => toggleShow(!state)} />
        <span className={`slider${size ? "-" + size : ""} round`}></span>
      </label>
    </div>
  );
};
export default ToggleThing;
