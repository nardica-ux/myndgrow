import React from "react";
import "./page-container.scss";

const PageContainer = ({ el, title }) => {
  const date = new Date().toLocaleDateString();

  return (
    <div className="page-container">
      <h2>
        {title}
        <span style={{ float: "right" }}>{date}</span>
      </h2>
      {el}
    </div>
  );
};

export default PageContainer;
