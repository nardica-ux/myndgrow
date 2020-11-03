import React, { useState } from "react";
import { paragraphs } from "../../source-texts/about-text";

const Details = ({ num }) => {
  const [current, navTo] = useState(num - 1);

  return (
    <div style={{ display: "block" }}>
      <h3> {paragraphs[current].subtitle}</h3>
      <div>
        <button onClick={current > 0 ? () => navTo(current - 1) : null}>
          previous
        </button>
        <button
          onClick={
            current < paragraphs.length - 1 ? () => navTo(current + 1) : null
          }
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Details;
