import React from "react";
import "../structure-container/structure.scss";
import AppButton from "../app-small-components/app-button-component";
import AppInput from "../app-small-components/app-input-component";

const AddNewTopic = ({ handleAddNew, newTopic, color, addNewTopic }) => {
  return (
    <div style={{ margin: "auto" }}>
      <label>Add new topic</label>
      <AppInput
        getValue={newTopic}
        color={color}
        callFunc={(e) => addNewTopic(e.target.value)}
      />
      <AppButton toggleText="Add" callFunc={() => handleAddNew()} />
    </div>
  );
};
export default AddNewTopic;
