import React, { useEffect, useState } from "react";
import app_class from "../app/App.module.scss";
import AppInput from "../app-small-components/app-input-component";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddNewTopic from "./add-new-topic";

const TopicsInput = ({ sub_groups, color, setSubGroups }) => {
  const [newTopic, addNewTopic] = useState("");
  const [topics, setTopics] = useState(undefined);

  const handleAddNew = () => {
    if (newTopic.length < 4) {
      alert("elaborate please");
      return;
    } else {
      setTopics({ ...topics, [sub_groups.length]: newTopic });
      setSubGroups([...sub_groups, newTopic]);
      addNewTopic("");
    }
  };

  useEffect(() => {
    if (!topics) {
      let init = {};
      sub_groups.forEach((el, i) => (init[i] = el));
      setTopics(init);
    } else setSubGroups(Object.values(topics));
  }, [JSON.stringify(topics)]);
  if (!topics) return null;

  return (
    <fieldset
      name="category-topics"
      style={{
        margin: 20,
        padding: 16,
        borderRadius: 8,
        color,
        borderColor: color,
        borderWidth: 1,
        maxWidth: 400,
      }}
    >
      <legend name="category-topics">Topics</legend>
      {Object.values(topics).map((el, i) => (
        <div key={"topic-" + color + i} style={{ display: "flex" }}>
          <AppInput
            callFunc={(e) => setTopics({ ...topics, [i]: e.target.value })}
            getValue={el}
            type="text"
            id={i}
            color={color}
          />
          <DeleteOutlineIcon
            htmlColor={color}
            fontSize="small"
            className={app_class.material_icons}
            style={{ marginTop: 20, marginLeft: 30 }}
            onClick={() => setTopics({ ...topics, [i]: "to delete" })}
          />
        </div>
      ))}
      <AddNewTopic
        handleAddNew={handleAddNew}
        getValue={newTopic}
        color={color}
        addNewTopic={addNewTopic}
      />
    </fieldset>
  );
};
export default TopicsInput;
