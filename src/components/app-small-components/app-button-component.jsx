import React from "react";
import css_const from "../app/app-style.scss";
import app_class from "../app/App.module.scss";

const AppButton = ({
  callFunc,
  toggleText = "button",
  disabled,
  type = "button",
  color,
  position,
  styleObj,
  size,
  theme,
}) => (
  <button
    type
    className={app_class.app_button}
    style={{
      position,
      right: position === "absolute" ? 10 : null,
      padding:
        size === "large"
          ? `${css_const.norm}px ${css_const.large}px`
          : `${css_const.small}px ${css_const.norm}px`,
      margin:
        size === "large"
          ? `${css_const.large}px auto`
          : `${css_const.small}px auto`,
      fontSize:
        size === "large"
          ? `${css_const.medium_font}`
          : `${css_const.norm_font}`,
      fontWeight: size === "large" ? null : 500,
      backgroundColor: disabled ? css_const.inactive_color : color,
      color: theme === "light" ? css_const.text_color : css_const.main_color,
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
