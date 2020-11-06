import React, { useState } from "react";
import { connect } from "react-redux";
import { add_story_draft } from "../../redux/success-stories/story-actions";
import SuccessStoryDiagram from "../success-stories/story-diagram";
import AppButton from "../app-small-components/app-button-component";

const ReviewCategoryForm = ({ group, editGroup, entries, add_story_draft }) => {
  function points() {
    let tracking = [];
    for (let date in entries) {
      for (let entry in entries[date]) {
        let el = undefined;
        if (
          entries[date][entry].hasOwnProperty("group_id") &&
          entries[date][entry].group_id === group.own_id
        ) {
          el = entries[date][entry];
        } else if (entries[date][entry].group === group.name) {
          el = entries[date][entry];
        }
        if (el) {
          tracking.push({
            points: parseInt(el.value),
            text: el.text,
            topic: [el.topic, parseInt(el.value)],
          });
        }
      }
    }
    return tracking;
  }

  const [results, setResults] = useState(points());

  const diagramInfo = (arr) => ({
    color: group.color,
    topics: [...group.sub_groups],
    points: arr.map((el) => el.points),
    topic_points: arr.map((el) => el.topic),
    comments: arr.map((el) => el.text),
  });

  return (
    <>
      <h4 style={{ color: group.color }}>Completing {group.name} Review</h4>
      <h1>Goal: {group.goal}</h1>
      <h4>Main Question: {group.question}</h4>
      <SuccessStoryDiagram diadata={diagramInfo(results)} scale={3} />

      <AppButton
        color={group.color}
        callFunc={() => editGroup({ ...group, status: "edit" })}
        toggleText="Cancel"
      />

      <AppButton
        color={"tomato"}
        callFunc={() => {
          add_story_draft(diagramInfo(results));
          editGroup({ ...group, status: "review" });
        }}
        toggleText={"Write Review"}
        styleObj={{ float: "right" }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  entries: state.entries.entries,
});
const mapDispatchToProps = (dispacth) => {
  return {
    add_story_draft: (obj) => dispacth(add_story_draft(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCategoryForm);
