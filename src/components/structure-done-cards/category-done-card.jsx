import React, { useState } from "react";
import ToggleThing from "../app-small-components/toggle-component";

const DoneCard = ({ el }) => {
  const { name, points, color, days, comments } = el;
  const [commentShow, toggleComm] = useState(false);
  const sum = (arr) => {
    let sum = 0;
    for (let num of arr) sum += num;
    return sum;
  };

  return (
    <div className="done-card">
      <p style={{ backgroundColor: color, textTransform: "uppercase" }}>
        {name}
        <span style={{ color: "white", marginLeft: "auto", paddingLeft: 10 }}>
          {sum(points)} in {days} days
        </span>
      </p>
      <div style={{ display: "flex", flexGrow: 5, minWidth: 300, margin: 15 }}>
        {points.map((el, i) => (
          <div
            key={name + i}
            className="done-bar"
            style={{ backgroundColor: color, width: el * 1.5 + "%" }}
          ></div>
        ))}
      </div>
      <ToggleThing
        size="small"
        toggleShow={() => toggleComm(!commentShow)}
        state={commentShow}
      />
      <div style={{ width: "100%", lineHeight: 2 }}>
        {commentShow
          ? comments.map((comm, i) => (
              <div
                style={{ width: "90%", margin: "auto" }}
                className="comments"
                key={name + i}
              >
                {comm}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default DoneCard;
