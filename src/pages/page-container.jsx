import React from "react";
import "./page-container.scss";

const PageContainer = ({ el, title }) => {
  const date = new Date().toLocaleDateString();

  return (
    <div className="page-container">
      <h2>{title}</h2>
      <span className="page-header-right">{date}</span>
      {el}
    </div>
  );
};

export default PageContainer;
