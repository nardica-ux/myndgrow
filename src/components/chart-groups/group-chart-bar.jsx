import React, { useState } from "react";
import "./group-chart.scss";
import ToggleThing from "../app-small-components/toggle-component";
import ColorBullet from "../app-small-components/bullet";
//groups
const GroupChartBar = ({
  groupValues,
  name,
  widthMax,
  comments,
  groupTotal,
  color,
}) => {
  const [show, toggleShow] = useState(false);

  let widthPerPoint = Math.floor(10000 / widthMax) / 100;
  let sum = 0;
  let widthPointsAcc = groupValues.map((el, i) => {
    sum += parseInt(el);
    return sum;
  });

  const renderChart = groupValues.map((el, i) => (
    <div
      key={name + i}
      className={"group-chart-bar"}
      style={{
        width: `${widthPointsAcc[i] * widthPerPoint}%`,
        backgroundColor: color,
        borderLeft: `3px solid ${color}`,
        opacity: 0.7 / (i * 0.5 + 0.5),
      }}
    ></div>
  ));

  return (
    <div className="group-chart-line">
      <h4>
        <span>
          {name} <ColorBullet color={color} />
          {groupTotal}
        </span>
        <ToggleThing state={show} toggleShow={toggleShow} size={"small"} />
      </h4>
      {renderChart}
      {show ? (
        <div className="comments group-comments">
          {comments.map((el, i) => (
            <p key={"text-" + i}>
              <ColorBullet color={color} />
              {el}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default GroupChartBar;
