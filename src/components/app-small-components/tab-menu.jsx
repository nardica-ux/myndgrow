import React from "react";

const Tabs = ({ arr = [], func, currentIndex = 0 }) => (
  <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
    {arr.length
      ? arr.map((el, i) => (
          <div
            key={"tab-" + i}
            style={{
              margin: 10,
              padding: 10,
              textTransform: "uppercase",
              color: currentIndex === i ? "red" : null,
              cursor: currentIndex === i ? null : "pointer",
            }}
            onClick={() => func(i)}
          >
            {el}
          </div>
        ))
      : "no tabs"}
  </div>
);

export default Tabs;
