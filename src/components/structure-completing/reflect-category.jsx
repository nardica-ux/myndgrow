import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./reflect-category.scss";
import AppButton from "../app-small-components/app-button-component";
import AppTextArea from "../app-small-components/textarea-component";
import ToggleThing from "../app-small-components/toggle-component";
import { add_story_draft } from "../../redux/success-stories/story-actions";

const ReflectCategoryForm = ({ user, new_draft, add_story_draft }) => {
  const [isPublic, setPublic] = useState(false);
  const [isCompleted, setCompleted] = useState(false);
  const [onCategory, reflectOnCategory] = useState("");
  const [onGoal, reflectOnGoal] = useState("");
  const [onQuestion, reflectOnQuestion] = useState("");
  const [onJourney, reflectOnJourney] = useState("");
  if (!new_draft) return <Redirect to="/structure" />;
  const {
    color,
    sub_groups,
    name,
    goal,
    question,
    comments,
    topic_points,
    points,
  } = new_draft;
  console.log(new_draft);

  const handleComplete = () => {
    const obj = {
      author_name: user.displayName,
      author_id: user.own_id,
      ava: user.ava || "",
      published: isPublic,
      is_completed: isCompleted,
      on_project: onCategory,
      on_goal: onGoal,
      on_question: onQuestion,
      story: onJourney,
      img: "",
      diadata: { points, topic_points, comments, color, sub_groups },
      comments,
      reactions: [],
    };
    console.log(obj);
  };

  return (
    <div>
      <form className="app-form">
        <div className="reflect-story">
          <p>
            Completing project:
            <br /> {name}
          </p>
          <AppTextArea
            color={color}
            name="thoughts-on-project"
            nolabel
            getValue={onCategory}
            placeHolder={"Thoughts on this project"}
            callFunc={(e) => reflectOnCategory(e.target.value)}
          />
        </div>
        <div className="reflect-story">
          <p>
            Project Goal:
            <br /> {goal}
          </p>
          <AppTextArea
            color={color}
            name="project-goal"
            nolabel
            placeHolder={"what is about the goal?"}
            getValue={onGoal}
            callFunc={(e) => reflectOnGoal(e.target.value)}
          />
        </div>
        <div className="reflect-story">
          <p>
            Project Question: <br />
            {question}
          </p>
          <AppTextArea
            color={color}
            name="project-question"
            placeHolder={"what is the answer for this question?"}
            nolabel
            getValue={onQuestion}
            callFunc={(e) => reflectOnQuestion(e.target.value)}
          />
        </div>
        <div className="reflect-story">
          <p>Notes about the journey</p>
          <AppTextArea
            color={color}
            name="project-journey"
            placeHolder="notes about your journey"
            nolabel
            getValue={onJourney}
            callFunc={(e) => reflectOnJourney(e.target.value)}
          />
        </div>
      </form>

      <div style={{ display: "flex" }}>
        Is Project completed?
        <ToggleThing state={isCompleted} toggleShow={setCompleted} />
        {isCompleted ? "set Completed" : "Save as Draft"}
      </div>
      <div style={{ display: "flex" }}>
        Share story? <ToggleThing state={isPublic} toggleShow={setPublic} />
        {isPublic ? "you are sharing your story" : "only you see the story"}
      </div>
      <AppButton
        color={"royalblue"}
        callFunc={() => add_story_draft(null)}
        toggleText={"set Uncomplete"}
        styleObj={{ float: "left" }}
      />
      <AppButton
        color={"tomato"}
        callFunc={() => handleComplete()}
        toggleText={"Submit Review"}
        styleObj={{ float: "right" }}
      />
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
  new_draft: state.stories.new_draft,
});
const mapDispatchToProps = (dispacth) => {
  return {
    add_story_draft: (obj) => dispacth(add_story_draft(obj)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReflectCategoryForm);
