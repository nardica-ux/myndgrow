import React from "react";
import SuccessStoryCard from "./success-story-card.jsx";
import { stories } from "./story-sample";

const SuccessStoryContainer = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {stories.map((el, i) => (
        <SuccessStoryCard storyData={el} />
      ))}
    </div>
  );
};
export default SuccessStoryContainer;
