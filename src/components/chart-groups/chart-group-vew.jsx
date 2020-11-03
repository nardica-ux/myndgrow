import React from "react";
import { connect } from "react-redux";
import GroupChartBar from "./group-chart-bar";
import { groups } from "../app/groups";

const ChartGroupView = ({ num, entries, categories }) => {
  function getDataArray(num) {
    let output = [];
    let count = 0;
    for (let date in entries) {
      if (count > num) break;
      for (let entry in entries[date]) output.push(entries[date][entry]);
      count++;
    }
    return output;
  }
  function groupReducer(key) {
    let groupObj = {};
    data.map((entry) => {
      if (groupObj[entry.group]) {
        groupObj[entry.group].push(entry[key]);
      } else {
        groupObj = {
          ...groupObj,
          [entry.group]: [entry[key]],
        };
      }
    });
    return groupObj;
  }
  const data = getDataArray(num);
  data.map((el) => console.log(el.group, el.value));
  const groupValues = groupReducer("value");
  let findEl = (group) => {
    let color = [...categories, ...groups].find((el) => el.name === group);
    return color ? color.color : "grey";
  };

  const renderGroupValues = () => {
    let groupChart = [];
    for (let group in groupValues) {
      groupChart.push(
        <GroupChartBar
          groupValues={groupValues[group]}
          key={"group-" + group}
          name={group}
          widthMax={getWidthMax()}
          comments={comments[group]}
          groupTotal={sum(groupValues[group])}
          color={findEl(group)}
        />
      );
    }
    return groupChart;
  };

  let sum = (arr) => {
    let sum = 0;
    arr.map((el) => (sum += parseInt(el)));
    return sum;
  };

  const getWidthMax = () => {
    let sumArr = Object.values(groupValues).map((el) => sum(el));
    return Math.max(...sumArr);
  };

  let comments = groupReducer("text");

  return (
    <div>
      <h4>group view</h4>
      {groupValues ? renderGroupValues() : null}
    </div>
  );
};
const mapStateToProps = (state) => ({
  entries: state.entries.entries,
  categories: state.categories.categories,
});
export default connect(mapStateToProps)(ChartGroupView);
