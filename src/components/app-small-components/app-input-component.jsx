import React from "react";
import "./app-input.scss";
import styles from "../app/app-style.scss";

const AppInput = ({
  callFunc,
  getValue,
  type = "text",
  name,
  color = styles.inactive_color,
  styleObj,
  id,
  placeHolder,
}) => (
  <label htmlFor={name} style={{ display: "block" }}>
    {name ? name.split("-").join(" ") : null}
    <input
      name={name}
      defaultValue={placeHolder}
      id={id}
      type={type}
      value={getValue}
      style={{
        ...styleObj,
        borderBottom: `${color} 2px solid`,
        color,
      }}
      onChange={callFunc}
    />
  </label>
);
export default AppInput;
