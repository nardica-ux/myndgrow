import { groups } from "../components/app/groups";
import { connect } from "react-redux";

export const getGroup = (param, array) => {
  let res = { color: undefined };
  if (!array.length) return (res = "grey");

  if (param.hasOwnProperty("group_id") && array.length) {
    res = array.find((gr) => gr.own_id === param.group_id);
  }
  if (!res.color) {
    if (param.topic)
      res = array.find(
        (el) => el.sub_groups && el.sub_groups.includes(param.topic)
      );
    if (groups.length) res = groups.find((gr) => gr.name === param.group);
    if (!res) res = { color: "grey" };
  }
  return res;
};

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
});
export const getData = ({ categories }) => categories[3].name;

export default connect(mapStateToProps)(getData);
