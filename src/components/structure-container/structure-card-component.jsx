import React, { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import "./structure.scss";
import PropTypes from "prop-types";

const StructureCard = ({ num, editGroup, categories, fetching }) => {
  const [group, setGroup] = useState(categories[num]);
  const { color, name, sub_groups, goal, question, own_id } = group;

  useEffect(() => {
    setGroup(categories[num]);
  }, [JSON.stringify(categories[num].sub_groups), fetching]);

  return (
    <div
      className="card-container structure-card"
      style={{ backgroundColor: fetching === own_id ? "wheat" : null }}
    >
      <div style={{ width: "60%", textAlign: "left" }}>
        <h4
          style={{ backgroundColor: color, color: "white" }}
          className="structure-group-title"
        >
          <EditIcon
            className="material-icons"
            style={{
              border: "1px solid white",
              borderRadius: 4,
              float: "right",
            }}
            onClick={() => editGroup({ ...categories[num], status: "edit" })}
          />
          {name}
        </h4>
        <p>
          <span style={{ color }}>Goal:</span>
          <br />
          {goal}
        </p>
        <p>
          <span style={{ color }}>Question: </span>
          <br />
          {question}
        </p>
      </div>
      <div className="topic-container">
        <h4 style={{ color }}>Topics</h4>
        {sub_groups && sub_groups.length
          ? sub_groups.map((el, i) => (
              <div key={el + i} style={{ borderLeft: `4px solid ${color}` }}>
                {el}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  fetching: state.categories.fetching,
});

export default connect(mapStateToProps)(StructureCard);

StructureCard.propTypes = {
  group: PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sub_groups: PropTypes.array,
  }),
  editGroup: PropTypes.func.isRequired,
};
