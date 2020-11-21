import React, { useState, useRef, useLayoutEffect } from "react";
import app_class from "../app/App.module.scss";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ChartGroupView from "../chart-groups/chart-group-vew";
import ChartNDays from "../chart-daily-view/chart-Ndays-container";
import CardHeader from "./graph-card-header";

const GraphCard = ({ num, groupped = false }) => {
  const [groupView, setView] = useState(groupped);
  const [reduced, toggleReduced] = useState(false);
  const [limited, setLimited] = useState(true);
  const [height, setHeight] = useState(0);
  const ref = useRef();
  useLayoutEffect(() => {
    if (ref.current) setHeight(ref.current.offsetHeight);
  }, []);

  const bottomIcon = limited ? (
    <div className={app_class.unfold_button}>
      <KeyboardArrowDownIcon
        className={`${app_class.material_icons} ${app_class.card_icons}`}
        onClick={() => setLimited(!limited)}
      />
    </div>
  ) : (
    <KeyboardArrowUpIcon
      className={`${app_class.material_icons} ${app_class.card_icons}`}
      onClick={() => setLimited(!limited)}
    />
  );

  return (
    <div
      className={`${app_class.card_container} ${
        limited && height > 550 ? app_class.limited_height : null
      }`}
      ref={ref}
    >
      <CardHeader
        view={groupView}
        num={num}
        status={reduced}
        setView={setView}
        toggleReduced={toggleReduced}
      />

      {reduced ? null : groupView ? (
        <ChartGroupView num={num} />
      ) : (
        <ChartNDays num={num} />
      )}
      {height > 550 ? bottomIcon : null}
    </div>
  );
};
export default GraphCard;
