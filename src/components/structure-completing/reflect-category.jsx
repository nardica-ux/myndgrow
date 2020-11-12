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
  const [anonymous, setAnonymous] = useState(true);
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
      anonymous,
      title: name,
      goal,
      question,
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
    <>
      <form className="app-form">
        <table className="table-form">
          <tbody>
            <tr>
              <td className="category-title">
                Completing project:
                <br />
                <span style={{ color }}>{name}</span>
              </td>
              <td>
                <AppTextArea
                  color={color}
                  name="thoughts-on-project"
                  nolabel
                  getValue={onCategory}
                  placeHolder={"Thoughts on this project"}
                  callFunc={(e) => reflectOnCategory(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="category-detail">
                Project Goal:
                <br />
                <span style={{ color }}>{goal}</span>
              </td>
              <td>
                <AppTextArea
                  color={color}
                  name="project-goal"
                  nolabel
                  placeHolder={"what is about the goal?"}
                  getValue={onGoal}
                  callFunc={(e) => reflectOnGoal(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="category-detail">
                Project Question: <br />
                <span style={{ color }}> {question}</span>
              </td>
              <td>
                <AppTextArea
                  color={color}
                  name="project-question"
                  placeHolder={"what is the answer for this question?"}
                  nolabel
                  getValue={onQuestion}
                  callFunc={(e) => reflectOnQuestion(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="category-detail">Notes about the journey</td>
              <td>
                <AppTextArea
                  color={color}
                  name="project-journey"
                  placeHolder="notes about your journey"
                  nolabel
                  getValue={onJourney}
                  callFunc={(e) => reflectOnJourney(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <ToggleThing
        state={isCompleted}
        status={isCompleted ? "set Completed" : "Save as Draft"}
        toggleShow={setCompleted}
        label={"Is Project completed?"}
        size="small"
      />

      <ToggleThing
        label={"Share story?"}
        state={isPublic}
        toggleShow={setPublic}
        margin={"10px auto"}
        size="small"
        status={
          isPublic ? "you are sharing your story" : "only you see the story"
        }
      />
      <ToggleThing
        label={"Show your name?"}
        state={anonymous}
        toggleShow={setAnonymous}
        margin={"10px auto"}
        size="small"
        status={
          anonymous
            ? "you are sharing anonymously"
            : "you publish under your name"
        }
      />

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
    </>
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
