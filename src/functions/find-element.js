import React from "react";
import { groups } from "../components/app/groups";
import { connect } from "react-redux";

export const getGroup = (param, array) => {
  let res = undefined;

  if (param.hasOwnProperty("group_id")) {
    res = array.find((gr) => gr.own_id === param.group_id);
  }
  if (!res) res = array.find((el) => el.sub_groups.includes(param.topic));
  if (!res) res = groups.find((gr) => gr.name === param.group);
  return res;
};

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
});
export const getData = ({ categories }) => categories[3].name;

export default connect(mapStateToProps)(getData);
