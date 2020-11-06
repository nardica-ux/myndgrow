import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./App.scss";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { auth, createUserProfileDocument } from "../../firebase/firebase-root";
import ErrorBoundary from "../error-boundary/error-boundary-component";

import { set_user } from "../../redux/user/user-actions";
import { refresh_entries_redux, init_entries } from "../../redux/entry-actions";
import {
  init_categories_start,
  init_categories,
} from "../../redux/categories/category-actions";
import { init_stories } from "../../redux/success-stories/story-actions";

import { pages } from "./pages";
import Header from "../header/header-container";
import PageContainer from "../../pages/page-container";
import { stories } from "../success-stories/story-sample";

function App({
  set_user,
  user = null,
  entries = null,
  refresh_entries_redux,
  init_entries,
  init_categories_start,
  init_categories,
  init_stories,
}) {
  let unsubscribeFromAuth = null;

  useEffect(() => {
    async function fetchData() {
      if (user && !entries.entries) {
        await refresh_entries_redux(user);
        await init_categories_start(user.own_id);
        init_stories(stories);
      }
    }
    fetchData();

    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        if (user) return;
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          let user = snapShot.data();
          set_user(user);
        });
      }
      unsubscribeFromAuth = null;
      set_user(null);
      init_categories([]);
      init_entries([]);
    });
  }, [user]); //entries were before

  const pagesComponents = pages.map((el, i) => (
    <Route
      exact={i === 0 ? true : false}
      path={el.path}
      key={el.name + i}
      component={() => (
        <ErrorBoundary>
          <PageContainer el={el.el} title={el.name} />
        </ErrorBoundary>
      )}
    />
  ));

  return (
    <div className="App">
      <Header pages={pages} user={user} />
      <Switch>{pagesComponents}</Switch>
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.user.user,
  entries: state.entries,
});
const mapDispatchToProps = (dispatch) => {
  return {
    set_user: (user) => dispatch(set_user(user)),
    refresh_entries_redux: (user) => dispatch(refresh_entries_redux(user)),
    init_entries: (obj) => dispatch(init_entries(obj)),
    init_categories_start: (id) => dispatch(init_categories_start(id)),
    init_categories: (id) => dispatch(init_categories(id)),
    init_stories: (arr) => dispatch(init_stories(arr)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  }),
};
