import React from "react";

const AppButton = ({
  callFunc,
  toggleText,
  disabled,
  type,
  color,
  position,
  styleObj,
  size,
  theme,
}) => (
  <button
    type={type || "button"}
    className="app-button"
    style={{
      position,
      right: position === "absolute" ? 10 : null,
      padding: size === "large" ? "10px 30px" : "5px 10px",
      margin: size === "large" ? "20px auto" : "10px auto",
      fontSize: size === "large" ? 20 : 14,
      fontWeight: size === "large" ? null : 500,
      backgroundColor: disabled ? "grey" : color,
      color: theme === "light" ? "darkblue" : "white",
      cursor: disabled ? null : "pointer",
      ...styleObj,
    }}
    onClick={callFunc}
    disabled={disabled}
  >
    {toggleText}
  </button>
);
export default AppButton;
