import React from "react";
import app_class from "../app/App.module.scss";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import str_class from "./structure.module.scss";
import PropTypes from "prop-types";

const StructureCard = ({ setGroup, fetching, category }) => {
  const { color, name, sub_groups, goal, question, own_id } = category;

  return (
    <div
      className={`${app_class.card_container} ${str_class.structure_card}`}
      style={{ backgroundColor: fetching === own_id ? "wheat" : null }}
    >
      <div style={{ width: "60%", textAlign: "left" }}>
        <h4
          style={{ backgroundColor: color, color: "white" }}
          className={str_class.structure_group_title}
        >
          <EditIcon
            className={app_class.material_icons}
            style={{
              border: "1px solid white",
              borderRadius: 4,
              float: "right",
            }}
            onClick={() => setGroup({ ...category, status: "edit" })}
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
      <div className={str_class.topic_container}>
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
  fetching: state.categories.fetching,
});

export default connect(mapStateToProps)(StructureCard);

StructureCard.propTypes = {
  group: PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sub_groups: PropTypes.array,
  }),
  setGroup: PropTypes.func.isRequired,
};
