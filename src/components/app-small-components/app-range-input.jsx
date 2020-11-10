import React from "react";
import Bullet from "./bullet";
import "./app-range.scss";

const AppRangeInput = ({
  callFunc,
  getValue,
  name,
  color,
  styleObj,
  placeHolder,
}) => (
  <label htmlFor={name}>
    {name ? name.split("-").join(" ") : null}
    <span style={{ color, fontSize: 25, margin: 16 }}>
      <Bullet color={color} />
      {getValue}
    </span>
    <input
      type="range"
      value={getValue}
      defaultValue={placeHolder}
      name={name}
      min="0"
      max="15"
      onChange={callFunc}
      style={{
        ...styleObj,
        backgroundColor: color,
        border: `5px solid ${color}`,
      }}
    />
  </label>
);
export default AppRangeInput;
