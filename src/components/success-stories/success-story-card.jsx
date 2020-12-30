import React, { useState } from "react";
import style from "../app/App.module.scss";
import el_class from "./success-story.module.scss";
import StoryCardExpanded from "./success-story-expanded";

const SuccessStoryCard = ({ storyData }) => {
  const [expanded, toggleExpanded] = useState(false);

  const {
    user_name,
    title,
    user_ava,
    color,
    on_project,
    on_goal,
    on_question,
    name,
    goal,
  } = storyData;

  let summary = (
    <div>
      <h5>{name}</h5>
      <p className="card-text" key={user_name || title}>
        {on_project}
      </p>
      <h5> {goal}</h5>
      <p className="card-text" key={user_name + 1 || title + 1}>
        {on_goal}
      </p>
      <h5>Test question was</h5>
      <p className="card-text" key={user_name + 2 || title + 2}>
        {on_question}
      </p>
    </div>
  );
  const cardheader = (
    <h3 style={{ marginTop: 0, color }}>
      <img
        src={`${"./img/avatars/sample-ava.png"}`}
        alt="ava"
        className={el_class.card_ava}
      />
      {title}
      {user_name ? (
        <span style={{ float: "right" }}>{user_name}</span>
      ) : (
        " by someone "
      )}
    </h3>
  );
  return (
    <div
      className={style.card_container}
      style={expanded ? { width: "100%" } : null}
    >
      {cardheader}
      {expanded ? <StoryCardExpanded storyData={storyData} /> : summary}
      <span
        onClick={() => toggleExpanded(!expanded)}
        className={el_class.success_story_expand}
        style={{ color, float: "right" }}
      >
        {expanded ? "...hide" : "...read more"}
      </span>
    </div>
  );
};

export default SuccessStoryCard;
