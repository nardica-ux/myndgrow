import React, { useState, Profiler, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./chart-Ndays.scss";
import { getGroup } from "../../functions/find-element";
import ChartBlock from "./chart-block-component";
import ToggleThing from "../app-small-components/toggle-component";

import "./chart-Ndays.scss";

const ChartNDays = ({ num, entries, user, categories = [] }) => {
  const [show, toggleShow] = useState(false);
  const [dates, setDates] = useState([]);

  let getDates = (num) => {
    // resetting data to contain only needed data for graph
    let arr = Object.keys(entries);
    let minim = Math.min(num, arr.length);
    let sorted = [...arr].sort(
      (a, b) => new Date(b).valueOf() - new Date(a).valueOf()
    );
    return sorted.slice(0, minim);
  };

  useEffect(() => {
    if (entries) setDates(getDates(num));
  }, [user]);

  let getSum = (obj) => {
    let sum = 0;
    for (let key in obj) {
      sum += parseInt(obj[key].value);
    }
    return sum;
  };

  const renderDayData = (obj) => {
    let output = [];
    for (let key in obj) {
      if (obj[key])
        output.push(
          <ChartBlock
            text={show}
            color={getGroup(obj[key], categories).color}
            entry={obj[key]}
          />
        );
    }
    return output;
  };
  if (!entries) return null;

  return (
    <Profiler id={`chart-${num}`} onRender={(id, phase, actualTime) => {}}>
      {!entries ? (
        user ? (
          <div className="loader">...coming soon </div>
        ) : null
      ) : (
        dates.map((date) => (
          <div key={date + "-day"}>
            <h4 style={{ marginBottom: 8 }}>
              {date}
              <span style={{ float: "right" }}>
                total {getSum(entries[date])}
              </span>
            </h4>
            {renderDayData(entries[date])}
          </div>
        ))
      )}

      <ToggleThing toggleShow={toggleShow} state={show} label={"show notes"} />
    </Profiler>
  );
};
const mapStateToProps = (state) => ({
  entries: state.entries.entries,
  categories: state.categories.categories,
  user: state.user.user,
});

export default connect(mapStateToProps)(ChartNDays);

ChartNDays.propTypes = {
  num: PropTypes.number.isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    own_id: PropTypes.string,
    type: PropTypes.string,
  }),
};
