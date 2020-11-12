import React, { useState } from "react";
import "./success-story.scss";
import SuccessStoryDiagram from "./story-diagram";

const SuccessStoryCard = ({ storyData }) => {
  const [expanded, toggleExpanded] = useState(false);
  const { name, story, own_id, diagram, comments, title, img_ava } = storyData;

  let content = () => {
    let renderstory = story.map((el, i) => (
      <p className="card-text" key={own_id + i}>
        {el}
      </p>
    ));
    return expanded ? renderstory : renderstory[0];
  };

  const renderAva = () => (
    <img src={`${img_ava}`} alt="ava" className="card-ava" />
  );

  return (
    <div className="card-container">
      <h3
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {title}
        <span style={{ color: diagram.color, marginLeft: "auto" }}>
          by {name} {renderAva()}
        </span>
      </h3>
      <SuccessStoryDiagram diadata={{ ...diagram, comments }} />
      {content()}
      <span
        onClick={() => toggleExpanded(!expanded)}
        className="success-story-expand"
        style={{ color: diagram.color }}
      >
        {expanded ? "...hide" : "...read more"}
      </span>
    </div>
  );
};

export default SuccessStoryCard;
