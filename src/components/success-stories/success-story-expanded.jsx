import React, { useState } from "react";
import { connect } from "react-redux";
import "./success-story.module.scss";
import SuccessStoryDiagram from "./story-diagram";
import AppInput from "../app-small-components/app-input-component";
import AppButton from "../app-small-components/app-button-component";
import { update_story_async } from "../../redux/success-stories/story-actions";

const StoryCardExpanded = ({ storyData, update_story_async, user }) => {
  const [newReaction, addNewReaction] = useState("");
  const {
    on_goal,
    on_project,
    on_question,
    user_name,
    anonymous,
    story,
    own_id,
    comments,
    title,
    img_ava,
    reactions,
    color,
    is_public,
    is_completed,
    points,
    topic_points,
    sub_groups,
    goal,
  } = storyData;

  const commentBlock = (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <AppInput
        callFunc={(e) => addNewReaction(e.target.value)}
        value={newReaction}
        placeHolder={"what do you think?"}
        color={color}
      />

      <AppButton
        callFunc={() =>
          update_story_async({
            ...storyData,
            reactions: [...reactions, newReaction],
            public_before: storyData.is_public,
          })
        }
        color={color}
        toggleText={"add"}
        styleObj={{ marginLeft: 40 }}
      />
    </div>
  );

  return (
    <>
      <SuccessStoryDiagram
        diadata={{ color, comments, goal, points, sub_groups, topic_points }}
      />
      <p>{on_goal}</p>
      <p>{on_project}</p>
      <p>{on_question}</p>
      <p>{story} </p>

      {user && user.own_id ? commentBlock : null}
    </>
  );
};

const mapPropsToState = (state) => ({
  user: state.user.user,
});

export default connect(mapPropsToState)(StoryCardExpanded);
