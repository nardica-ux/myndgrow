import React from "react";
import "../structure-container/structure.scss";
import AppButton from "../app-small-components/app-button-component";
import AppInput from "../app-small-components/app-input-component";

const AddNewTopic = ({ handleAddNew, newTopic, color, addNewTopic }) => {
  return (
    <div
      style={{
        margin: "auto",
        marginTop: 16,
        display: "flex",
        alignItems: "flex-end",
        flexWrap: "wrap",
      }}
    >
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
