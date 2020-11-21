import React from "react";
import edit_class from "./structure-edit.module.scss";
import AppButton from "../app-small-components/app-button-component";
import AppInput from "../app-small-components/app-input-component";

const AddNewTopic = ({ handleAddNew, newTopic, color, addNewTopic }) => {
  return (
    <div className={edit_class.add_box}>
      <AppInput
        getValue={newTopic}
        color={color}
        callFunc={(e) => addNewTopic(e.target.value)}
        name="Add-new-topic"
      />
      <AppButton
        toggleText="Add"
        callFunc={() => handleAddNew()}
        styleObj={{ marginTop: "auto" }}
      />
    </div>
  );
};
export default AddNewTopic;
