import React from "react";

const AppInput = ({
  callFunc,
  getValue,
  radius,
  type,
  name,
  color,
  position,
  styleObj,
  key,
  id,
  align,
  size,
  placeHolder,
}) => (
  <label htmlFor={name}>
    <input
      name={name}
      placeholder={placeHolder}
      key={key}
      id={id}
      type={type}
      value={getValue}
      style={{
        ...styleObj,
        backgroundImage: "none",
        textAlign: align,
        width: "70%",
        minWidth: 200,
        outline: "none",
        border: "none",
        padding: 5,
        position,
        top: 0,
        right: 0,
        borderRadius: radius || "4px",
        backgroundColor: "transparent",
        borderBottom: `${color || "grey"} 2px solid`,
        color: color || "grey",
      }}
      onChange={callFunc}
    />
  </label>
);
export default AppInput;
