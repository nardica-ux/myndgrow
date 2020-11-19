import React, { useState } from "react";
import "./success-story.scss";
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
    diadata,
    comments,
    title,
    img_ava,
    reactions,
    color,
    is_public,
    is_completed,
  } = storyData;

  return (
    <div>
      <SuccessStoryDiagram diadata={{ ...diadata, comments }} />
      {user && user.own_id ? (
        <form className="app-form">
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
          />
        </form>
      ) : null}
    </div>
  );
};
export default StoryCardExpanded;
