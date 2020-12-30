import React, { useState } from "react";
import ToggleThing from "../app-small-components/toggle-component";
import el_class from "./success-story.module.scss";
import Bullet from "../app-small-components/bullet";

const SuccessStoryDiagram = ({ diadata, scale = 1 }) => {
  const [commentsShown, showComments] = useState(false);
  const { color, sub_groups, points, topic_points, comments } = diadata;

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

  return (
    <div className={el_class.diagram_container}>
      <div>
        <p className={el_class.card_text}>Points Total: {sum(points)}</p>
        <p className={el_class.card_text}>
          sub_groups:
          {sub_groups.map((el) => (
            <span
              style={{ color, borderColor: color, display: "inline-block" }}
            >
              {el}
            </span>
          ))}
        </p>
        <ToggleThing
          toggleShow={showComments}
          state={commentsShown}
          size="small"
          label={commentsShown ? "hide notes" : "show notes"}
        />
      </div>
      <div className={el_class.dia_card}>
        {pointsGrow.map((el, i) => (
          <div
            className={el_class.dia_chartbar}
            key={"chart-" + i}
            style={{
              height: el * 2 * scale,
              backgroundColor: color,
              position: "relative",
              width: 8 * (1 + scale / 4),
            }}
          >
            <p style={{ color }} className={el_class.chart_points}>
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
