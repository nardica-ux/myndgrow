import React from "react";
import Intro from "../../source-texts/intro";
import "./introduction.scss";

const Introduction = () => (
  <div className={"box"}>
    {Intro.steps.length
      ? Intro.steps.map((el, i) => (
          <div key={"text-" + i} className={"par"}>
            <h4>Step {i + 1}</h4>
            <p>{el.text}</p>
            <img src={`./img/use-story/${el.img}`} />
          </div>
        ))
      : null}
  </div>
);

export default Introduction;
