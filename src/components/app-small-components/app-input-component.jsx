import React from "react";

const AppInput = ({
  callFunc,
  getValue,
  type,
  name,
  color,
  styleObj,
  key,
  id,
  align,
  size,
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
        textAlign: align,
        borderBottom: `${color || "grey"} 2px solid`,
        color: color || "grey",
      }}
      onChange={callFunc}
    />
  </label>
);
export default AppInput;
