import React, { useState } from "react";
import "./success-story.scss";

const SuccessStoryDiagram = ({ diadata }) => {
  const { color, total, topics, points } = diadata;

  return (
    <>
      <div className="dia-card">
        {points.map((el, i) => (
          <div
            className="dia-chartbar"
            key={"chart-" + i}
            style={{ height: el * 4, backgroundColor: color }}
          ></div>
        ))}
      </div>
      <p className="card-text">Points Total: {total}</p>
      <p className="card-text">
        Topics:{" "}
        {topics.map((el) => (
          <span style={{ color, borderColor: color }}>{el}</span>
        ))}
      </p>
    </>
  );
};
export default SuccessStoryDiagram;
