import React from "react";
import "./textarea.scss";

const AppTextArea = ({
  callFunc,
  getValue,
  name = "",
  color = "grey",
  styleObj,
  placeHolder,
  nolabel,
  rows = 4,
}) => (
  <label htmlFor={name} style={{ display: "block" }}>
    {!nolabel ? name.split("-").join(" ") : null}
    <textarea
      name={name ? name : "app-textarea"}
      rows={rows}
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
