import React, { useState } from "react";
import "./chart-block.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AppModal from "../app-small-components/modal-component";
import { delete_entry } from "../../redux/entry-actions";
import EntryInputComponent from "../entry-components/detail-state-entry-";

const ChartBlock = ({ text, delete_entry, theme, color, entry }) => {
  const [editing, setEdit] = useState(false);

  return (
    <div key={entry.own_id}>
      <div className="chart-el">
        <div>
          <DeleteOutlineIcon
            htmlColor={color}
            fontSize="small"
            className="materail-icons"
            style={{ marginRight: 8 }}
            onClick={() => delete_entry(entry)}
          />
          <EditIcon
            htmlColor={color}
            fontSize="small"
            className="materail-icons"
            style={{ marginRight: 8 }}
            onClick={() => setEdit(true)}
          />
        </div>
        <div className="entry-topic">
          {entry.topic}
          <span className="text-on-hover" id="text">
            {entry.text}
          </span>
        </div>
        <div
          className="chart-bar"
          style={{
            backgroundColor: color || "grey",
            width: entry.value * 20,
            color: theme === "light" ? "black" : "white",
          }}
        >
          {entry.value}
        </div>
      </div>
      {text ? <div className="comments">{entry.text}</div> : null}

      <AppModal open={editing} getmodalclosed={() => setEdit(false)}>
        <EntryInputComponent contentToEdit={entry} />
      </AppModal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    delete_entry: (entry) => dispatch(delete_entry(entry)),
  };
};
export default connect(null, mapDispatchToProps)(ChartBlock);

ChartBlock.propTypes = {
  text: PropTypes.bool.isRequired,
  delete_entry: PropTypes.func.isRequired,
  theme: PropTypes.string,
};
