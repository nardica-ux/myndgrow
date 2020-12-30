import React, { useState } from "react";
import { connect } from "react-redux";
import SuccessStoryCard from "./success-story-card.jsx";
import Tabs from "../app-small-components/tab-menu";

const SuccessStoryContainer = ({ user_stories, public_stories }) => {
  const [active, setActive] = useState(0);
  const tabNames = ["public", "own"];
  let stories;
  active === 0 ? (stories = public_stories) : (stories = user_stories);
  if (!stories || !stories.length) return <div>no stories yet</div>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Tabs arr={tabNames} func={setActive} current={active} />
      {stories.map((el, i) => (
        <SuccessStoryCard
          key={"success-" + i}
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
