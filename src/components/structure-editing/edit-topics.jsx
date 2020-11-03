import React, { useEffect } from "react";
import "../structure-container/structure.scss";
import AppInput from "../app-small-components/app-input-component";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const TopicsInput = ({ topics, setTopics, color }) => {
  useEffect(() => {}, [JSON.stringify(topics)]);
  if (!topics) return null;
  let topicsArr = Object.values(topics);

  return (
    <fieldset
      name="category-topics"
      // className="card-container"
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
      {topicsArr.map((el, i) => (
        <div key={"topic-" + color + i}>
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
            className="materail-icons"
            style={{ marginTop: 16 }}
            onClick={() => setTopics({ ...topics, [i]: "to delete" })}
          />
        </div>
      ))}
    </fieldset>
  );
};
export default TopicsInput;
