import React from "react";
import { mind_story } from "../../source-texts/mind-story";
import "./mind-story.scss";

const MindStory = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {mind_story.map((el, i) => (
        <div className="use-story" key={"mind-story-" + i}>
          <div>
            <h4>{el.title}</h4>
            {el.text_i.map((parag, i) => (
              <p key={el.title + i}>{parag}</p>
            ))}
          </div>
          <div style={{ flexGrow: 0, width: "auto" }}>
            <img src={`./img/use-story/${el.image}`} alt={el.image_text} />
          </div>
          <div>
            <h4>{el.resolution}</h4>
            {el.text_ii.map((parag, i) => (
              <p key={el.title + i}>{parag}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default MindStory;
