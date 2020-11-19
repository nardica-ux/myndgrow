import React, { useState } from "react";
import "./success-story.scss";
import StoryCardExpanded from './success-story-expanded'

const SuccessStoryCard = ({ storyData }) => {
  const [expanded, toggleExpanded] = useState(false);

  const {
    user_name,
    title,
    img_ava,
    color,
    on_project,
    on_goal,
  } = storyData;

  let contentShort = (
    <div>
      <p className="card-text" key={user_name || title}>
        {on_project}
      </p>
      <p className="card-text" key={user_name + 1 || title + 1}>
        {on_goal}
      </p>
    </div>
  );
const cardheader = (
  <h3
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    {title}
    {user_name ? (
      <span style={{ color, marginLeft: "auto" }}>
        {user_name}
        <img src={`${img_ava}`} alt="ava" className="card-ava" />
      </span>
    ) : (
      " by someone "
    )}
  </h3>
);
  return (
    <div className="card-container" style={expanded ? { width: "100%" } : null}>
      {cardheader}
      {expanded ? <StoryCardExpanded storyData={{}} /> : contentShort}
      <span
        onClick={() => toggleExpanded(!expanded)}
        className="success-story-expand"
        style={{ color }}
      >
        {expanded ? "...hide" : "...read more"}
      </span>
    </div>
  );
};

export default SuccessStoryCard;
