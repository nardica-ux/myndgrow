import React, { useEffect } from "react";
import PropTypes from "prop-types";
import app_class from "./App.module.scss";
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
import {
  init_user_stories_async,
  init_public_stories_async,
  init_user_stories_success,
} from "../../redux/success-stories/story-actions";

import { pages } from "./pages";
import Header from "../header/header-container";
import PageContainer from "../../pages/page-container";

function App({
  set_user,
  user = null,
  entries = null,
  public_stories,
  refresh_entries_redux,
  init_entries,
  init_categories_start,
  init_categories,
  init_user_stories_async,
  init_public_stories_async,
  init_user_stories_success,
}) {
  let unsubscribeFromAuth = null;
  useEffect(() => {
    if (!public_stories.length) init_public_stories_async();
  }, [public_stories.length]);
  useEffect(() => {
    if (user && !entries.entries) {
      refresh_entries_redux(user);
      init_categories_start(user.own_id);
      init_user_stories_async(user.own_id);
    }
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
      init_user_stories_success([]);
    });
  }, [JSON.stringify(user)]); //entries were before

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
    <div className={app_class.App}>
      <Header pages={pages} user={user} />
      <Switch>{pagesComponents}</Switch>
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.user.user,
  entries: state.entries,
  stories: state.stories.user_stories,
  public_stories: state.stories.public_stories,
});
const mapDispatchToProps = (dispatch) => {
  return {
    set_user: (user) => dispatch(set_user(user)),
    refresh_entries_redux: (user) => dispatch(refresh_entries_redux(user)),
    init_entries: (obj) => dispatch(init_entries(obj)),
    init_categories_start: (id) => dispatch(init_categories_start(id)),
    init_categories: (id) => dispatch(init_categories(id)),
    init_user_stories_async: (id) => dispatch(init_user_stories_async(id)),
    init_public_stories_async: () => dispatch(init_public_stories_async()),
    init_user_stories_success: (arr) =>
      dispatch(init_user_stories_success(arr)),
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
