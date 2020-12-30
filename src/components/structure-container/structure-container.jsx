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
import Tabs from "../app-small-components/tab-menu";

const StructureBlock = ({ categories }) => {
  const tabNames = ["active", "completed"];
  const [openGroup, setGroup] = useState(false);
  const [activeIndex, setActive] = useState(0);

  let content = [];
  activeIndex === 0
    ? (content = categories
        .filter(
          (el) => !el.hasOwnProperty("status") || el.status !== tabNames[1]
        )
        .map((el, i) => (
          <StructureCard
            category={el}
            setGroup={setGroup}
            key={el.name + "-category-active"}
          />
        )))
    : (content = categories
        .filter((el) => el.status === tabNames[1])
        .map((el, i) => (
          <DoneCard
            own_id={el.own_id}
            key={i + "-category-done"}
            is_public={el.is_public}
          />
        )));

  function getElement() {
    switch (openGroup.status) {
      default:
        break;
      case "structure": {
        return <EditStructure editGroup={setGroup} />;
      }
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
      <Tabs arr={tabNames} func={setActive} current={activeIndex} />
      <div className="">{content}</div>
    </ErrorBoundary>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
  categories: state.categories.categories,
});

export default connect(mapStateToProps)(StructureBlock);
