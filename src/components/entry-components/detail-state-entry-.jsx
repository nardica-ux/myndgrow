import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Bullet from "../app-small-components/bullet";
import AppButton from "../app-small-components/app-button-component";
import "./entry.scss";
import { getGroup } from "../../functions/find-element";
import { add_entry, update_entry } from "../../redux/entry-actions";

import ErrorBoundary from "../error-boundary/error-boundary-component";
import "./entry-form.scss";

function EntryInputComponent({
  add_entry,
  contentToEdit = {
    own_id: 123,
  },
  user,
  update_entry,
  categories,
}) {
  const [newGroup, setGroup] = useState(categories[0]);
  const [thisGroupTopics, resetTopics] = useState(categories[0].sub_groups);
  const [selectedTopic, setNewTopic] = useState();
  const [points, setPoints] = useState(3);
  const [newText, setText] = useState("");
  const [color, setColor] = useState(categories[0].color);
  const [gotContent, gotEditContent] = useState(false);

  const startEditing = () => {
    let editGroup = getGroup(contentToEdit, categories);
    setGroup(editGroup); // found the realted group
    resetTopics(editGroup.sub_groups);
    setNewTopic(contentToEdit.topic);
    setPoints(contentToEdit.value);
    setColor(editGroup.color);
    setText(contentToEdit.text);
  };

  useEffect(() => {
    if (contentToEdit.own_id !== 123 && !gotContent) {
      startEditing();
      gotEditContent(true);
    } else {
      resetTopics(newGroup.sub_groups);
      if (newGroup.hasOwnProperty("sub_groups") && newGroup.sub_groups.length)
        setNewTopic(newGroup.sub_groups[0]);
      setColor(newGroup.color);
    }
  }, [newGroup.name, gotContent]); //contentToEdit.own_id,

  const groupsOptions = () => (
    <select
      onChange={(e) =>
        setGroup(categories.find((el) => el.name === e.target.value))
      }
      autoFocus
      required
    >
      {categories.map((el) => (
        <option key={el.name + "-select"} value={el.name}>
          {el.name}
        </option>
      ))}
    </select>
  );

  const topicsOptions = (arr) => (
    <select
      required
      onChange={(e) => {
        setNewTopic(e.target.value);
        setPoints(3);
      }}
    >
      {arr
        ? arr.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))
        : null}
    </select>
  );

  const handleSubmit = async () => {
    let newobj = {
      topic: selectedTopic,
      text: newText,
      topic: selectedTopic,
      value: points,
      user_id: user.own_id,
      group_id: newGroup.own_id,
      own_id: contentToEdit.own_id,
    };
    if (contentToEdit.own_id === 123) {
      // add signal that entry was added to render new line
      await add_entry(newobj);
      //  setPost(newobj);
    } else {
      await update_entry(newobj);
    }
  };

  const InputRange = (
    <>
      <label htmlFor="points">Points granted: </label>
      <span style={{ color, fontSize: 25, margin: 16 }}>
        <Bullet color={color} />
        {points}
      </span>
      <input
        type="range"
        value={points}
        name="points"
        min="0"
        max="15"
        onChange={(e) => setPoints(e.target.value)}
        style={{
          backgroundColor: color,
          border: `5px solid ${color}`,
        }}
      />
    </>
  );
  const GetTextArea = (text) => (
    <textarea
      name="text"
      rows="4"
      cols="50"
      placeholder={"enter the comments you have for the entry"}
      value={text}
      onChange={(e) => setText(e.target.value)}
      style={{
        border: `1px solid ${color}`,
      }}
    />
  );

  return (
    <div className="entry-form">
      <ErrorBoundary>
        <div className="entry-start">
          <h5 style={{ color }}>
            {contentToEdit ? "Edit your entry: " : "Add new entry"}
          </h5>
          {groupsOptions(newGroup)}
          {topicsOptions(thisGroupTopics)}
        </div>

        <div className="entry-main">
          {InputRange}
          <br />
          {GetTextArea(newText)}
        </div>
        <div style={{ width: "100%" }}>
          <AppButton
            type="button"
            callFunc={() => gotEditContent(false)}
            toggleText="RESET"
            color={"grey"}
          />
          <AppButton
            callFunc={() => handleSubmit()}
            toggleText={
              contentToEdit.own_id !== 123 ? "Submit Edited" : "Add New Entry"
            }
            color={color}
            styleObj={{ marginLeft: 20 }}
          />
        </div>
      </ErrorBoundary>
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.user.user,
  categories: state.categories.categories,
});
const mapDispatchToProps = (dispatch) => {
  return {
    add_entry: (entry) => dispatch(add_entry(entry)),
    update_entry: (entry) => dispatch(update_entry(entry)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryInputComponent);
