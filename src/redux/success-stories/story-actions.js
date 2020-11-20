import {
  firebase_add_story,
  firebase_init_user_stories,
  firebase_update_user_story,
  firebase_fetch_public_stories,
  firebase_update_story_public,
  firebase_add_public,
} from "../../firebase/firebase-stories";

export const storyActionTypes = {
  INIT_USER_STORIES_SUCCESS: "INIT_USER_STORIES_SUCCESS",
  SET_STORY_DRAFT: "SET_STORY_DRAFT",

  SUBMIT_STORY_SUCCESS: "SUBMIT_STORY_SUCCESS",
  SUBMIT_STORY_FAIL: "SUBMIT_STORY_FAIL",

  UPDATE_USER_STORY_SUCCESS: "UPDATE_USER_STORY_SUCCESS",
  UPDATE_USER_STORY_SUCCESS: "UPDATE_USER_STORY_SUCCESS",
  PUBLIC_STORIES_SUCCESS: "PUBLIC_STORIES_SUCCESS",
  TOGGLE_PUBLIC_STORY: "TOGGLE_PUBLIC_STORY",
};

export const public_stories_success = (arr) => ({
  type: storyActionTypes.PUBLIC_STORIES_SUCCESS,
  payload: arr,
});

export const init_public_stories_async = () => {
  return async (dispatch) => {
    try {
      let arr = await firebase_fetch_public_stories();
      let filtered = arr.filter((el) => el);
      if (arr && arr.length) dispatch(public_stories_success(filtered));
    } catch (e) {
      dispatch(submit_story_fail(e));
    }
  };
};
export const update_story_public_async = (story) => {
  return async (dispatch) => {
    try {
      let update = firebase_update_story_public(story);
      // if (update) dispatch(toggle_public_success(update));
    } catch (e) {
      dispatch(submit_story_fail(e));
    }
  };
};

export const update_user_story_async = (story) => {
  return async (dispatch) => {
    try {
      let updateRef = await firebase_update_user_story(story);
      let updatePublic = await firebase_update_story_public(story);
      dispatch(update_user_story_success(updateRef));
    } catch (err) {
      dispatch(submit_story_fail(err));
    }
  };
};
const update_user_story_success = (story) => ({
  type: storyActionTypes.UPDATE_USER_STORY_SUCCESS,
  payload: story,
});

export const init_user_stories_async = (user_id) => {
  return async (dispatch) => {
    try {
      let arr = await firebase_init_user_stories(user_id);
      dispatch(init_user_stories_success(arr));
    } catch (err) {
      dispatch(submit_story_fail(err));
    }
  };
};

export const init_user_stories_success = (arr) => ({
  type: storyActionTypes.INIT_USER_STORIES_SUCCESS,
  payload: arr,
});

export const add_story_draft = (story) => ({
  type: storyActionTypes.SET_STORY_DRAFT,
  payload: story,
});

export const submit_story_async = (story) => {
  return async (dispatch) => {
    try {
      let update = await firebase_add_story(story);
      if (story.is_public) {
        let newPublic = await firebase_add_public(update);
        if (newPublic) init_public_stories_async();
      }
      if (update) {
        dispatch(submit_story_success(update));
        dispatch(add_story_draft(null));
      }
    } catch (err) {
      dispatch(submit_story_fail(err));
    }
  };
};

export const submit_story_success = (story) => ({
  type: storyActionTypes.SUBMIT_STORY_SUCCESS,
  payload: story,
});
export const submit_story_fail = (err) => ({
  type: storyActionTypes.SUBMIT_STORY_FAIL,
  payload: err,
});
