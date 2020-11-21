import React, { useState } from "react";
import style from "../app/App.module.scss";
import "./about.scss";
import Intro from "../../source-texts/intro";
import { paragraphs } from "../../source-texts/about-text";
import AppModal from "../app-small-components/modal-component";
import Details from "./about-details";

const About = ({}) => {
  const [modalOpen, toggleModal] = useState(false);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div className="intro-box">
        <div>
          <h3> Welcome to MyndGrow project!</h3>
          {Intro.intro.map((el, i) => (
            <p key={"about-" + i}>{el}</p>
          ))}
        </div>
        <img src={`./img/${Intro.intro_img}`} className="intro-img" />
      </div>
      <h3 style={{ width: "100%" }}>How MyndGrow works</h3>
      {paragraphs.map(({ icon, subtitle, text, link }, i) => (
        <div
          className={style.card_container}
          key={subtitle + "-how"}
          style={{ boxShadow: "none", textAlign: "left" }}
        >
          <div>
            <h5 className="about-subtitle2">
              <img
                src={`./img/icons-about/${icon}`}
                className="about-icon-title"
              />
              {subtitle}
            </h5>
          </div>
          <p>{text}</p>
          <span className="about-link" onClick={() => toggleModal(i + 1)}>
            {link} >>
          </span>
        </div>
      ))}
      <AppModal open={modalOpen} getmodalclosed={toggleModal}>
        <Details num={modalOpen} />
      </AppModal>
    </div>
  );
};

export default About;
