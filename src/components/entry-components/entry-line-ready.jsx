import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Bullet from "../app-small-components/bullet";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { delete_entry } from "../../redux/entry-actions";
import "./entry.scss";
import { getGroup } from "../../functions/find-element";

function EntryLineReady({
  entry,
  delete_entry,
  setEdited,
  updatedEntry,
  categories,
}) {
  const [gotEntry, setEntry] = useState(entry);
  const { group, text, value, topic } = gotEntry;
  const [color, setColor] = useState(getGroup(entry, categories).color);

  useEffect(() => {
    if (updatedEntry && updatedEntry.own_id === entry.own_id) {
      setEntry(updatedEntry);
      setColor(getGroup(updatedEntry, categories).color);
    }
  }, [updatedEntry]);

  const content = (
    <p className="comments" style={{ width: "100%" }}>
      {text}
    </p>
  );

  return (
    <div
      className="chosen-entry"
      style={{ width: "70%", minWidth: 400, margin: "auto" }}
    >
      <h4 className="chosen-entry">
        <span className="chosen">{group}</span>
        <Bullet color={color} />
        <span className="chosen topic" style={{ color }}>
          {topic}
        </span>
        <Bullet color={color} />
        <span style={{ color }} className="chosen topic">
          {value}
        </span>
        <span style={{ marginLeft: "auto" }}>
          <EditIcon
            htmlColor="royalblue"
            fontSize="small"
            className="material-icons entry-icon"
            onClick={() => setEdited(entry)}
          />
          <DeleteOutlineIcon
            htmlColor="royalblue"
            fontSize="small"
            className="material-icons entry-icon"
            onClick={() => delete_entry(entry)}
            onDblClick={() => console.log("hey")}
          />
        </span>
      </h4>

      {content}
    </div>
  );
}
const mapStateToProps = (state) => ({
  updatedEntry: state.entries.updatedEntry,
  categories: state.categories.categories,
});

const mapDispatchToProps = (dispatch) => {
  return {
    delete_entry: (entry) => dispatch(delete_entry(entry)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EntryLineReady);

EntryLineReady.propTypes = {
  entry: PropTypes.shape({
    group: PropTypes.string,
    text: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    topic: PropTypes.string.isRequired,
  }),
};
