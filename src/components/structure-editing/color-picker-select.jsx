import React, { useState } from "react";
import "../app/App.module.scss";

const colors = [
  "darkred",
  "firebrick",
  "indianred",
  "tomato",
  "coral",
  "lightsalmon",
  "mediumseafreen",
  "limegreen",
  "green",
  "mediumturquoise",
  "mediumaquamarine",
  "royalblue",
  "cornflowerblue",
  "skyblue",
  "blueviolet",
  "darkcyan",
  "teal",
  "indigo",
  "dodgerblue",
  "purple",
  "plum",
  "palevioletred",
  "darkorchid",
  "orange",
  "goldenrod",
  "peru",
  "chocolate",
  "darkkhaki",
  "olive",
];

const ColorSelect = ({ activeColor, name, setColor, id }) => {
  const [shown, toggle] = useState(false);
  if (!name) return null;

  const options = colors.map((el, i) => (
    <span
      style={{ backgroundColor: el }}
      key={el}
      onClick={() => setColor(el, id)}
    />
  ));

  const handleToggle = () => {
    if (shown) {
      setTimeout(() => {
        el.classList.remove("animate-closure");
        toggle(!shown);
      }, 350);
      let el = document.getElementById(name);
      el.classList.add("animate-closure");
    } else toggle(!shown);
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onClick={() => handleToggle()}
    >
      <div
        className="app-color-select"
        style={{ backgroundColor: activeColor }}
      />
      {shown ? (
        <div className="color-container" id={name}>
          <div className="close-chip" onClick={() => toggle(false)}>
            X
          </div>
          {options}
        </div>
      ) : null}
    </div>
  );
};
export default ColorSelect;
