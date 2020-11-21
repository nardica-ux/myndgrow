import React from "react";
import { connect } from "react-redux";
import app_class from "../app/App.module.scss";
import { Redirect } from "react-router-dom";
import GroupChipContainer from "../app-small-components/group-chip-container";
import ErrorBoundary from "../error-boundary/error-boundary-component";
import GraphCard from "../graph-card/graph-card-component";

const Dashboard = ({ user }) => {
  return user ? (
    <div className={app_class.content_block}>
      <h3>My categories</h3>
      <GroupChipContainer />
      <ErrorBoundary>
        <GraphCard num={3} />
        <GraphCard num={7} groupped={false} />
      </ErrorBoundary>
    </div>
  ) : (
    <>
      <Redirect to="/about" />
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Dashboard);
