import React from "react";
import "./textarea.scss";

const AppTextArea = ({
  callFunc,
  getValue,
  name = "",
  color,
  styleObj,
  placeHolder,
  nolabel,
}) => (
  <label htmlFor={name} style={{ display: "block" }}>
    {!nolabel ? name.split("-").join(" ") : null}
    <textarea
      name={name ? name : "app-textarea"}
      rows="4"
      cols="40"
      placeholder={placeHolder}
      value={getValue}
      onChange={callFunc}
      style={{
        ...styleObj,
        border: `1px solid ${color}`,
      }}
    />
  </label>
);
export default AppTextArea;
