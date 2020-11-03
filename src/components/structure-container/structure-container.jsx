import React, { useState } from "react";
import { connect } from "react-redux";
import StructureCard from "./structure-card-component";
import AppModal from "../app-small-components/modal-component";
import EditStructure from "../structure-editing/edit-structure-popup";
import EditGroup from "../structure-editing/edit-group-popup";
import AppButton from "../app-small-components/app-button-component";
import CategoriesDone from "../structure-done-cards/categories-done";
import ErrorBoundary from "../error-boundary/error-boundary-component";
import FinishCategoryForm from "../structure-editing/finish-category-popup";

const StructureBlock = ({ categories }) => {
  const [openGroup, setGroup] = useState(false);
  return (
    <ErrorBoundary>
      <div style={{ width: "100%", position: "relative" }}>
        <AppButton
          callFunc={() => setGroup(true)}
          toggleText={openGroup ? "Close" : "Manage Groups"}
        />

        <AppModal
          open={openGroup}
          getmodalclosed={setGroup}
          title={
            openGroup && openGroup.hasOwnProperty("name")
              ? "Edit " + openGroup.name + " group"
              : "Manage learning Structure"
          }
        >
          {openGroup === true ? (
            <EditStructure editGroup={setGroup} />
          ) : openGroup.hasOwnProperty("status") &&
            openGroup.status === "completed" ? (
            <FinishCategoryForm group={openGroup} editGroup={setGroup} />
          ) : (
            <EditGroup group={openGroup} editGroup={setGroup} />
          )}
        </AppModal>
      </div>
      <h3>Categories active</h3>
      <div className="content-block">
        {categories.map((el, i) => (
          <StructureCard
            num={i}
            editGroup={setGroup}
            key={el.name + "-category-active"}
          />
        ))}
      </div>
      <CategoriesDone />
    </ErrorBoundary>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
  categories: state.categories.categories,
});

export default connect(mapStateToProps)(StructureBlock);
