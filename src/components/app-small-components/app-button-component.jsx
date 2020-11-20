import React from "react";
import styles from "../app/app-style.scss";

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
    className="app-button"
    style={{
      position,
      right: position === "absolute" ? 10 : null,
      padding:
        size === "large"
          ? `${styles.norm}px ${styles.large}px`
          : `${styles.small}px ${styles.norm}px`,
      margin:
        size === "large" ? `${styles.large}px auto` : `${styles.small}px auto`,
      fontSize:
        size === "large" ? `${styles.medium_font}` : `${styles.norm_font}`,
      fontWeight: size === "large" ? null : 500,
      backgroundColor: disabled ? styles.inactive_color : color,
      color: theme === "light" ? styles.text_color : styles.main_color,
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
