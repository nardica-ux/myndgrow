import React, { useState } from "react";
import { connect } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import "../structure-container/structure.scss";
import ToggleThing from "../app-small-components/toggle-component";

const DoneCard = ({ own_id, user_stories, is_public }) => {
  const [commentShow, toggleComm] = useState(false);
  const [publicStory, setPublic] = useState(is_public);
  let story = user_stories.find((el) => el.story_id === own_id);
  if (!story) return null;
  const {
    name,
    points,
    color,
    comments,
    question,
    goal,
    createdAt,
    on_goal,
    on_project,
    on_question,
    sub_groups,
  } = story;

  const days = points.length;
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
        className="done-bar"
        style={{ backgroundColor: color, width: el * 3 + "%" }}
      >
        {el}
      </div>
    ));

  return (
    <div
      className="card-container structure-card"
      style={{ width: "96%", flexWrap: "wrap" }}
    >
      <div>
        <h4
          style={{ backgroundColor: color, color: "white", width: "47%" }}
          className="structure-group-title"
        >
          <EditIcon
            className="material-icons"
            style={{
              border: "1px solid white",
              borderRadius: 4,
              float: "right",
            }}
            onClick={() => console.log(true)}
          />
          {name}
        </h4>
        <p>GOAL: {goal}</p>
        <p>
          {sum(points)} in {days} days
        </p>

        <div style={{ display: "flex", minWidth: 300, margin: "45px auto" }}>
          {pointsBar()}
        </div>
        <ToggleThing
          size="small"
          toggleShow={() => toggleComm(!commentShow)}
          state={commentShow}
          label="show comments"
        />
      </div>
      <div style={{ width: "47%" }}>
        <p>{on_project ? "My thoughts " + on_project : null}</p>
        <p>{on_goal ? "Regarding the goal: " + on_goal : null}</p>
        <p>
          {on_question
            ? "The question I had: " + question + " The answer is " + on_goal
            : null}
        </p>
        <p>date: {createdAt}</p>
        <div>
          {sub_groups.map((el) => (
            <p style={{ color, margin: "2px" }}> {el}</p>
          ))}
        </div>
        <ToggleThing
          toggleShow={() => setPublic(!publicStory)}
          getValue={publicStory}
          label="is Public?"
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
export default connect(mapStateToProps)(DoneCard);
