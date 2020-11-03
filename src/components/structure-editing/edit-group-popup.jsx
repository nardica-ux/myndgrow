import React, { useState } from "react";
import "../structure-container/structure.scss";
import { connect } from "react-redux";
import AppButton from "../app-small-components/app-button-component";
import AddNewTopic from "./add-new-topic";
import TopicsInput from "./edit-topics";
import AppInput from "../app-small-components/app-input-component";
import { update_category_start } from "../../redux/categories/category-actions";

const EditGroup = ({ group, update_category_start, editGroup }) => {
  let num = 0;
  let init = {};
  if (group.hasOwnProperty("sub_groups") && group.sub_groups.length) {
    num = group.sub_groups.length;
    group.sub_groups.forEach((el, i) => (init[i] = el));
  }

  const [nextNum, setNextNum] = useState(num);
  const [topics, setTopics] = useState(init);
  const [newTopic, addNewTopic] = useState("");
  const [newName, setNewName] = useState(group.name);
  const [newGoal, setNewGoal] = useState(group.goal);
  const [newQuestion, setNewQuestion] = useState(group.question);
  let sub_groups = Object.values(topics).filter((el) => el !== "to delete");

  const handleAddNew = () => {
    if (newTopic.length < 4) {
      alert("elaborate please");
      return;
    } else {
      setTopics({ ...topics, [nextNum]: newTopic });
      addNewTopic("");
      setNextNum(nextNum + 1);
    }
  };
  let fields = [
    [newName, setNewName],
    [newGoal, setNewGoal],
    [newQuestion, setNewQuestion],
  ];
  let output = fields.map((el) => (
    <tr>
      <td>
        <label htmlFor={`category-${el[0]}`}>Category {el[0]}</label>
      </td>
      <td>
        <AppInput
          getValue={el[0]}
          callFunc={(e) => el[1](e.target.value)}
          name={`category-${el[0]}`}
          type="text"
          color={group.color}
        />
      </td>
    </tr>
  ));

  return (
    <form
      // className="app-form"
      onSubmit={(e) => {
        e.preventDefault();
        update_category_start({
          ...group,
          sub_groups,
          name: newName,
          goal: newGoal,
          question: newQuestion,
        });
      }}
    >
      <table style={{ display: "block", margin: "auto" }}>
        <tbody>{output}</tbody>
      </table>

      <TopicsInput topics={topics} setTopics={setTopics} color={group.color} />
      <AddNewTopic
        handleAddNew={handleAddNew}
        newTopic={newTopic}
        color={group.color}
        addNewTopic={addNewTopic}
      />
      <AppButton
        toggleText="All categories"
        color={"royalblue"}
        styleObj={{ float: "left" }}
        callFunc={() => editGroup(true)}
      />
      <AppButton
        toggleText="Finish!"
        color="red"
        callFunc={() => editGroup({ ...group, status: "completed" })}
        styleObj={{ margin: "auto" }}
      />
      <AppButton
        toggleText="Save changes"
        type="submit"
        color={group.color}
        styleObj={{ float: "right" }}
      />
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
