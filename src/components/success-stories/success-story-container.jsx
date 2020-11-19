import React, { useState } from "react";
import { connect } from "react-redux";
import SuccessStoryCard from "./success-story-card.jsx";
// import { stories } from "./story-sample";

const Tabs = (arr, func, current) => (
  <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
    {arr.map((el, i) => (
      <div
        key={"tab-" + i}
        style={{
          margin: 10,
          padding: 10,
          textTransform: "uppercase",
          color: current === i ? "red" : null,
          cursor: current === i ? null : "pointer",
        }}
        onClick={() => func(i)}
      >
        {el}
      </div>
    ))}
  </div>
);

const SuccessStoryContainer = ({ user_stories, public_stories }) => {
  const [active, setActive] = useState(0);

  let stories;
  active === 0 ? (stories = public_stories) : (stories = user_stories);
  if (!stories || !stories.length) return null;

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Tabs(["public", "own"], setActive, active)}
      {stories.map((el, i) => (
        <SuccessStoryCard
          storyData={el}
          active={active}
          setActive={setActive}
        />
      ))}
    </div>
  );
};
const mapStateToProps = (state) => ({
  public_stories: state.stories.public_stories,
  user_stories: state.stories.user_stories,
});
export default connect(mapStateToProps)(SuccessStoryContainer);
