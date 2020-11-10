import React, { useState } from "react";
import ToggleThing from "../app-small-components/toggle-component";
import "./success-story.scss";
import Bullet from "../app-small-components/bullet";

const SuccessStoryDiagram = ({ diadata, scale = 1 }) => {
  const [commentsShown, showComments] = useState(false);
  const { color, sub_groups, points, topic_points } = diadata;
  let accumulatedPoints = (arr) => {
    let newArr = [arr[0]];
    for (let i = 1; i < arr.length; i++) newArr.push(arr[i] + newArr[i - 1]);
    return newArr;
  };
  const pointsGrow = accumulatedPoints(points);

  let sum = (arr) => {
    let sum = 0;
    for (let el of arr) sum += el;
    return sum;
  };

  const topicPoints = () => {
    let sub_groupsObj = {};
    for (let topic of topic_points) {
      sub_groupsObj.hasOwnProperty(topic[0])
        ? sub_groupsObj[topic[0]].push(topic[1])
        : (sub_groupsObj[topic[0]] = [topic[1]]);
    }
    console.log(sub_groupsObj);
    return sub_groupsObj;
  };
  const topicValues = topicPoints();

  return (
    <div className="diagram-container">
      <div>
        <h2 style={{ color }}> Result snapshot</h2>
        <p className="card-text">Points Total: {sum(points)}</p>
        <p className="card-text">
          sub_groups:{" "}
          {sub_groups.map((el) => (
            <span
              style={{ color, borderColor: color, display: "inline-block" }}
            >
              {el} {topicValues[el] ? sum(topicValues[el]) : 0}
            </span>
          ))}
        </p>
        <ToggleThing
          toggleShow={showComments}
          state={commentsShown}
          size="small"
        />
      </div>
      <div className="dia-card">
        {pointsGrow.map((el, i) => (
          <div
            className="dia-chartbar"
            key={"chart-" + i}
            style={{
              height: el * 2 * scale,
              backgroundColor: color,
              position: "relative",
              width: 8 * (1 + scale / 4),
            }}
          >
            <p style={{ color }} className="chart-points">
              {points[i]}
            </p>
            <span>{diadata.comments ? diadata.comments[i] : ""}</span>
          </div>
        ))}
      </div>

      {commentsShown && diadata.hasOwnProperty("comments") ? (
        <div>
          {diadata.comments.map((el, i) => (
            <p key={color + i} className="comments">
              <Bullet color={color} />
              {el}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default SuccessStoryDiagram;
