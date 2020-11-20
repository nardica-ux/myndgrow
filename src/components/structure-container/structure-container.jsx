import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import StructureCard from "./structure-card-component";
import AppModal from "../app-small-components/modal-component";
import EditStructure from "../structure-editing/edit-structure-popup";
import EditGroup from "../structure-editing/edit-group-popup";
import AppButton from "../app-small-components/app-button-component";
import ErrorBoundary from "../error-boundary/error-boundary-component";
import ReviewCategoryForm from "../structure-completing/review-category-popup";
import DoneCard from "../structure-done-cards/category-done-card";
import { CATEGORY } from "../app/CONSTANTS";

const StructureBlock = ({ categories }) => {
  const tabs = {
    ACTIVE: "active",
    COMPLETED: "completed",
  };
  const [openGroup, setGroup] = useState(false);
  const [current, setCurrent] = useState(tabs.ACTIVE);

  let content = (current) => {
    let arr = categories;
    if (current === tabs.ACTIVE) {
      let filtArr = arr.filter(
        (el) => !el.hasOwnProperty("status") || el.status !== tabs.COMPLETED
      );
      return filtArr.map((el, i) => (
        <StructureCard
          category={el}
          editGroup={setGroup}
          key={el.name + "-category-active"}
        />
      ));
    } else {
      let filterArr = arr.filter((el) => el.status === tabs.COMPLETED);
      return filterArr.map((el, i) => (
        <DoneCard
          own_id={el.own_id}
          key={i + "-category-done"}
          is_public={el.is_public}
        />
      ));
    }
  };

  function getElement() {
    switch (openGroup.status) {
      default:
        break;
      case "structure":
        return <EditStructure editGroup={setGroup} />;
      case CATEGORY.STATUS.EDIT:
        return <EditGroup group={openGroup} editGroup={setGroup} />;
      case CATEGORY.STATUS.STARTCOMPLETE:
        return <ReviewCategoryForm group={openGroup} editGroup={setGroup} />;
      case CATEGORY.STATUS.REVIEW:
        return <Redirect to="/review-reflect" />;
    }
  }

  return (
    <ErrorBoundary>
      <div style={{ width: "100%", position: "relative" }}>
        <AppButton
          callFunc={() => setGroup({ status: "structure" })}
          toggleText={openGroup ? "Close" : "Manage Groups"}
        />

        <AppModal
          open={openGroup}
          getmodalclosed={setGroup}
          title={
            openGroup && openGroup.hasOwnProperty("name")
              ? "Edit " + openGroup.name + " category"
              : "Manage learning Structure"
          }
        >
          {getElement()}
        </AppModal>
      </div>
      <h3>
        <span
          className={current === tabs.ACTIVE ? "tab-active" : "tab-inactive"}
          onClick={() => setCurrent(tabs.ACTIVE)}
        >
          Categories active
        </span>
        <span
          className={current === tabs.COMPLETED ? "tab-active" : "tab-inactive"}
          onClick={() => setCurrent(tabs.COMPLETED)}
        >
          Completed categories
        </span>
      </h3>
      <div className="content-block">{content(current)}</div>
    </ErrorBoundary>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
  categories: state.categories.categories,
});

export default connect(mapStateToProps)(StructureBlock);
