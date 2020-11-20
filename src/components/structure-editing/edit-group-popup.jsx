import React, { useState } from "react";
import "../structure-container/structure.scss";
import { connect } from "react-redux";
import AppButton from "../app-small-components/app-button-component";
import colors from "../app/app-style.scss";
import TopicsInput from "./edit-topics";
import AppInput from "../app-small-components/app-input-component";
import { update_category_start } from "../../redux/categories/category-actions";

const EditGroup = ({ group, update_category_start, editGroup }) => {
  const [newName, setNewName] = useState(group.name);
  const [newGoal, setNewGoal] = useState(group.goal);
  const [newQuestion, setNewQuestion] = useState(group.question);
  const [subGroups, setSubGroups] = useState(group.sub_groups);

  let fields = [
    [newName, setNewName],
    [newGoal, setNewGoal],
    [newQuestion, setNewQuestion],
  ];
  let labels = ["name", "goal", "question"];
  let output = fields.map((el, i) => (
    <AppInput
      getValue={el[0]}
      callFunc={(e) => el[1](e.target.value)}
      name={`Edit-${labels[i]}`}
      type="text"
      color={group.color}
    />
  ));

  return (
    <form
      className="app-form"
      onSubmit={(e) => {
        e.preventDefault();
        update_category_start({
          ...group,
          sub_groups: Object.values(subGroups).filter(
            (el) => el !== "to delete"
          ),
          name: newName,
          goal: newGoal,
          question: newQuestion,
        });
      }}
    >
      <div style={{ display: "block", margin: "auto" }}>{output}</div>

      <TopicsInput
        color={group.color}
        sub_groups={subGroups}
        setSubGroups={setSubGroups}
      />
      <div style={{ textAlign: "center" }}>
        <AppButton
          toggleText="Show all categories"
          color={colors.accent_color}
          theme="light"
          callFunc={() => editGroup({ status: "structure" })}
        />

        <AppButton
          toggleText="Update Category"
          type="submit"
          styleObj={{ margin: 20 }}
          color={group.color}
        />
        <AppButton
          toggleText="Review"
          theme="light"
          color={colors.active_color}
          callFunc={() => editGroup({ ...group, status: "startcomplete" })}
        />
      </div>
    </form>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    update_category_start: (obj) => dispatch(update_category_start(obj)),
  };
};
const mapStateToProps = (state) => ({
  fetching: state.categories.fetching,
});
export default connect(mapStateToProps, mapDispatchToProps)(EditGroup);
