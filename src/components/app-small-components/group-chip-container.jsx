import React, { useState } from "react";
import { connect } from "react-redux";
import "./group-chip.scss";

const GroupChipContainer = ({ categories }) => {
  const [opened, setOpened] = useState([]);

  const handleChip = (name) => {
    if (opened.includes(name)) {
      let updated = [...opened];
      setOpened(updated.filter((el) => el !== name));
    } else {
      let updated = [...opened, name];
      setOpened(updated);
    }
  };

  const card = (el) => (
    <div
      key={el.name + "-chip"}
      className="group-chip"
      style={{ backgroundColor: el.color }}
    >
      <p>{el.name}</p>
      <span className="chip" onClick={() => handleChip(el.name)}>
        {opened.includes(el.name) ? "X" : "+"}
      </span>
      <div style={opened.includes(el.name) ? null : { display: "none" }}>
        <strong> Goal:</strong> {el.goal}
        <br />
        <strong> Question:</strong> {el.question}
      </div>
    </div>
  );
  return (
    <div className="group-chip-container" key={"chip-container"}>
      {categories.length
        ? categories.map((el) => (
            <div style={{ display: "flex" }} key={el.name + "-chip"}>
              {card(el)}
            </div>
          ))
        : null}
    </div>
  );
};
const mapStateToProps = (state) => ({
  categories: state.categories.categories,
});

export default connect(mapStateToProps)(GroupChipContainer);
