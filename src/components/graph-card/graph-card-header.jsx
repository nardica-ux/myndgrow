import React from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AppButton from "../app-small-components/app-button-component";

const CardHeader = ({
  reduced,
  groupView,
  toggleReduced,
  setView,
  num,
  view,
}) => {
  const title = reduced ? (
    <KeyboardArrowDownIcon
      className="material-icons card-icons"
      onClick={() => toggleReduced(!reduced)}
    />
  ) : (
    <KeyboardArrowUpIcon
      className="material-icons card-icons"
      onClick={() => toggleReduced(!reduced)}
    />
  );
  return (
    <h3>
      {title}
      {groupView ? "Group" : ""} {num}-days chart
      <AppButton
        toggleText={view ? "Daily view" : "Group view"}
        callFunc={() => {
          console.log(view);
          setView(!view);
        }}
        disabledTerm={reduced ? true : false}
        styleObj={{ float: "right", marginTop: -5 }}
      />
    </h3>
  );
};
export default CardHeader;
