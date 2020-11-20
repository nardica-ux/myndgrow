import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../structure-container/structure.scss";
import ToggleThing from "../app-small-components/toggle-component";
import "./category-done.scss";
import AppButton from "../app-small-components/app-button-component";
import AppTextArea from "../app-small-components/textarea-component";

import { update_user_story_async } from "../../redux/success-stories/story-actions";

const DoneCard = ({ own_id, user_stories, update_user_story_async }) => {
  const [commentShow, toggleComm] = useState(false);
  const [editMode, setMode] = useState(false);
  const [newOnProject, setOnProject] = useState("");
  const [newOnQuestion, setOnQuestion] = useState("");
  const [newOnGoal, setOnGoal] = useState("");
  const [newOnJourney, setOnJourney] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isAnonymous, setAnonymous] = useState(false);
  const [data, setData] = useState(
    user_stories.find((el) => el.story_id === own_id)
  );
  const [init, setInit] = useState(null);

  const handleSubmit = () => {
    const updateStory = {
      on_project: newOnProject,
      on_goal: newOnGoal,
      on_question: newOnQuestion,
      story: newOnJourney,
      is_public: isPublic,
      anonymous: isAnonymous,
    };
    let newText = JSON.stringify(updateStory);
    let oldTExt = JSON.stringify(init);
    if (newText.length !== oldTExt.length || oldTExt !== newText) {
      console.log({ ...data, ...updateStory });
      update_user_story_async({
        ...data,
        ...updateStory,
      });
      setInit(null);
    }
  };

  useEffect(() => {
    if (!init) {
      setInit({
        on_project: data.on_project,
        on_goal: data.on_goal,
        on_question: data.on_question,
        story: data.story,
        is_public: data.is_public,
        anonymous: data.anonymous,
      });
      if (data.on_project) setOnProject(data.on_project);
      if (data.on_goal) setOnGoal(data.on_goal);
      if (data.on_question) setOnQuestion(data.on_question);
      if (data.story) setOnJourney(data.story);
      if (data.is_public) setIsPublic(data.is_public);
      if (data.anonymous) setAnonymous(data.anonymous);
    } else {
      if (data.on_project) setOnProject(init.on_project);
      if (data.on_goal) setOnGoal(init.on_goal);
      if (data.on_question) setOnQuestion(init.on_question);
      if (data.story) setOnJourney(init.story);
      if (data.is_public) setIsPublic(init.is_public);
      if (data.anonymous) setAnonymous(init.anonymous);
    }
  }, [editMode]);

  if (!data) return null;
  const {
    color,
    points,
    createdAt,
    name,
    sub_groups,
    question,
    goal,
    comments,
  } = data;

  const days = data.points.length;
  const sum = (arr) => {
    if (!arr || !arr.length) return 0;
    let sum = 0;
    for (let num of arr) sum += num;
    return sum;
  };

  const pointsBar = () =>
    points.map((el, i) => (
      <div
        key={name + i}
        className="done-points"
        style={{ backgroundColor: color, width: el * 3 + "%" }}
      >
        {el}
      </div>
    ));
  const lineWrapper = (val, note, func) => {
    if (editMode) {
      return (
        <AppTextArea
          color={color}
          getValue={val}
          rows={2}
          callFunc={(e) => func(e.target.value)}
          styleObj={{ color }}
        />
      );
    } else if (!editMode && val) {
      return <p>{note + val}</p>;
    } else return null;
  };

  return (
    <div className="card-container structure-card fullwid">
      <div className="flex-half">
        <h4
          style={{ backgroundColor: color, color: "white", width: "90%" }}
          className="structure-group-title"
        >
          {name}: DONE
          <AppButton
            callFunc={() => setMode(!editMode)}
            toggleText={editMode ? "cancel" : "edit"}
            styleObj={{ float: "right", marginTop: 0, opacity: 1 }}
          />
        </h4>

        {lineWrapper(newOnProject, "comments on project: ", setOnProject)}
        <h4>TOPICS: </h4>
        <div>
          {sub_groups.map((el) => (
            <p style={{ color, margin: "2px" }}> {el}</p>
          ))}
        </div>

        <div style={{ display: "flex", minWidth: 300, flexWrap: "wrap" }}>
          <h4>POINTS: </h4>
          {pointsBar()}{" "}
          <div
            className="done-points"
            style={{
              backgroundColor: color,
              color: "white",
              textAlign: "center",
              padding: "0 8px",
            }}
          >
            = {sum(points)}
          </div>
        </div>
        <p>date: {createdAt}</p>
        <ToggleThing
          toggleShow={setIsPublic}
          state={isPublic}
          name="public"
          label="Published?"
          size="small"
        />
        <ToggleThing
          toggleShow={setAnonymous}
          state={isAnonymous}
          name="anonym"
          label="Under your name?"
          size="small"
        />
      </div>
      <div className="flex-half">
        <h4>GOAL: {goal}</h4>
        {lineWrapper(newOnGoal, "comments on goal: ", setOnGoal)}

        <h4>
          JOURNEY: {sum(points)} points in {days} days
        </h4>
        {lineWrapper(newOnJourney, "comments on journey: ", setOnJourney)}
        <h4>THE QUESTION: {question} </h4>
        {lineWrapper(newOnQuestion, "comments on question: ", setOnQuestion)}

        {editMode ? (
          <AppButton
            callFunc={() => handleSubmit()}
            color={color}
            toggleText="submit"
          />
        ) : null}

        <ToggleThing
          size="small"
          toggleShow={() => toggleComm(!commentShow)}
          state={commentShow}
          label="show comments"
          styeObj={{ marginTop: "auto" }}
        />
      </div>
      {commentShow
        ? comments.map((comm, i) => (
            <div className="comments" key={name + i} style={{ width: "96%" }}>
              {comm}
            </div>
          ))
        : null}
    </div>
  );
};
const mapStateToProps = (state) => ({
  user_stories: state.stories.user_stories,
});
const mapDispatchToProps = (dispatch) => {
  return {
    update_user_story_async: (obj) => dispatch(update_user_story_async(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoneCard);
