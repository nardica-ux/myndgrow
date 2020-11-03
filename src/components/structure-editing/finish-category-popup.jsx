import React, { useState } from "react";
import { connect } from "react-redux";

const FinishCategoryForm = ({ group, editGroup, user, entries }) => {
  // name, story[]
  const [isPublic, setPublic] = useState(false);
  const [storyChuncks, setStory] = useState({ [0]: "" });

  const points = () => {
    let points = [];
    for (let date in entries) {
      for (let entry in entries[date]) {
        if (entries[date][entry].group.own_id.group_id === group.own_id)
          points.push(entries[date][entry].value);
      }
    }
    return points;
  };

  const diagram = {
    color: group.color,
    topics: [...group.topics],
    points: points(),
  };

  const handleComplete = () => {
    const obj = {
      name: user.displayName,
      author_id: user.own_id,
      ava: user.ava || "",
      published: isPublic,
      story: storyChuncks,
      img: "",
      diagram,
      comments: [],
    };
    console.log(obj);
  };

  return (
    <div>
      <button onClick={() => editGroup({ ...group, status: "active" })}>
        Cancel
      </button>
      <button onClick={() => handleComplete()}>Complete</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  entries: state.entries.entries,
  user: state.user.user,
});

export default connect(mapStateToProps)(FinishCategoryForm);
