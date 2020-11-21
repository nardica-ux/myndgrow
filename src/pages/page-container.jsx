import React from "react";
import page_class from "./page-container.module.scss";

const PageContainer = ({ el, title }) => {
  const date = new Date().toLocaleDateString();

  return (
    <div className={page_class.page_container}>
      <h2>{title}</h2>
      <span className={page_class.page_header_right}>{date}</span>
      {el}
    </div>
  );
};

export default PageContainer;
