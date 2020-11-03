import React, { useState } from "react";
import { connect } from "react-redux";
import EntryInputComponent from "./detail-state-entry-";
import EntryLineReady from "./entry-line-ready";

const AddDayProgress = ({ entriesToday }) => {
  const [contentToEdit, setEdited] = useState(undefined);

  return (
    <div style={{ width: "96%", flexWrap: "wrap" }}>
      <EntryInputComponent
        contentToEdit={contentToEdit}
        setEdited={setEdited}
      />
      {entriesToday.length ? (
        <>
          <h4 className="today-entries">Created today </h4>
          <div style={{ flexGrow: 5, flexWrap: "wrap" }}>
            {entriesToday.map((el, i) => (
              <EntryLineReady
                entry={el}
                key={el.own_id}
                setEdited={setEdited}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};
const mapStateToProps = (state) => ({
  entriesToday: state.entries.entriesToday,
});

export default connect(mapStateToProps)(AddDayProgress);
