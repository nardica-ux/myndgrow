import React, { useState } from "react";
import { connect } from "react-redux";
import { groups } from "../app/groups";
import SuccessStoryDiagram from "../success-stories/story-diagram";
import AppButton from "../app-small-components/app-button-component";

const FinishCategoryForm = ({ group, editGroup, user, entries }) => {
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
  const [isPublic, setPublic] = useState(false);
  const [storyChuncks, setStory] = useState({ [0]: "" });
  const [results, setResults] = useState(points());
  const [reviewStarted, startReview] = useState(false);

  const diagramInfo = (arr) => ({
    color: group.color,
    topics: [...group.sub_groups],
    points: arr.map((el) => el.points),
    topic_points: arr.map((el) => el.topic),
    comments: arr.map((el) => el.text),
  });

  const handleComplete = () => {
    const obj = {
      name: user.displayName,
      author_id: user.own_id,
      ava: user.ava || "",
      published: isPublic,
      story: storyChuncks,
      img: "",
      diagram: diagramInfo(results),
      comments: results.map((el) => el.text),
      reactions: [],
    };
    console.log(obj);
  };

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
        callFunc={() => editGroup({ ...group, status: "review" })}
        toggleText={"Start Review"}
        styleObj={{ float: "right" }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  entries: state.entries.entries,
  user: state.user.user,
});

export default connect(mapStateToProps)(FinishCategoryForm);
