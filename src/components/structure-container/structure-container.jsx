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

const StructureBlock = ({ categories }) => {
  const [openGroup, setGroup] = useState(false);
  const [current, setCurrent] = useState("active");

  let content = (current) => {
    let arr = categories;
    if (current === "active") {
      let filtArr = arr.filter(
        (el) => !el.hasOwnProperty("status") || el.status !== "completed"
      );
      return filtArr.map((el, i) => (
        <StructureCard
          category={el}
          editGroup={setGroup}
          key={el.name + "-category-active"}
        />
      ));
    } else {
      let filterArr = arr.filter((el) => el.status === "completed");
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
      case "edit":
        return <EditGroup group={openGroup} editGroup={setGroup} />;
      case "startcomplete":
        return <ReviewCategoryForm group={openGroup} editGroup={setGroup} />;
      case "review":
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
        <span style={{ marginRight: 10 }} onClick={() => setCurrent("active")}>
          Categories active
        </span>
        <span onClick={() => setCurrent("completed")}>
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
