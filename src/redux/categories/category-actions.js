import {
  addCategoryFire,
  fetchUserCategories,
  updateCategoryFire,
} from "../../firebase/firebase-categories";

export const categoryActionTypes = {
  FAKE_DATA: "FAKE_DATA",

  ADD_CATEGORY_SUCCESS: "ADD_CATEGORY_SUCCESS",
  ADD_CATEGORY_FAILURE: "ADD_CATEGORY_FAILURE",
  ADD_CATEGORY_DONE: "ADD_CATEGORY_DONE",

  DELETE_CATEGORY_REDUX: "DELETE_CATEGORY_REDUX",
  INIT_CATEGORIES: "INIT_CATEGORIES",

  UPDATE_CATEGORY_SUCCESS: "UPDATE_CATEGORY_SUCCESS",
  UPDATE_CATEGORY_FAILURE: "UPDATE_CATEGORY_FAILURE",

  CATEGORY_FETCHING_TRUE: "CATEGORY_FETCHING_TRUE",
  CATEGORY_FETCHING_FALSE: "CATEGORY_FETCHING_FALSE",
};

export const init_categories_start = (userid) => {
  return async (dispatch) => {
    try {
      let arr = await fetchUserCategories(userid);
      if (arr.length) {
        dispatch(init_categories(arr));
      } else console.log("no categories");
      return "OK";
    } catch (err) {
      console.log(err);
    }
  };
};

export const init_categories = (arr) => ({
  type: categoryActionTypes.INIT_CATEGORIES,
  payload: arr,
});

export const add_category = (category) => {
  return async (dispatch) => {
    try {
      let catNew = await addCategoryFire(category);
      dispatch(add_category_success(catNew));
      return "OK";
    } catch (err) {
      dispatch(add_category_failure(err));
    }
  };
};
export const add_category_success = (category) => ({
  type: categoryActionTypes.ADD_CATEGORY_SUCCESS,
  payload: category,
});
export const add_category_failure = (err) => ({
  type: categoryActionTypes.ADD_CATEGORY_FAILURE,
  payload: err,
});

export const update_category_start = (obj) => {
  return async (dispatch) => {
    try {
      dispatch(category_fetching_true(obj.own_id));
      let updateCategory = await updateCategoryFire(obj);
      dispatch(update_category_success(updateCategory));
      dispatch(category_fetching_false());
    } catch (err) {
      dispatch(category_fetching_false());
      dispatch(update_category_failure(err));
    }
  };
};
export const update_category_success = (category) => ({
  type: categoryActionTypes.UPDATE_CATEGORY_SUCCESS,
  payload: category,
});
export const update_category_failure = (err) => ({
  type: categoryActionTypes.UPDATE_CATEGORY_FAILURE,
  payload: err,
});
export const category_fetching_true = (id) => ({
  type: categoryActionTypes.CATEGORY_FETCHING_TRUE,
  payload: id,
});
export const category_fetching_false = () => ({
  type: categoryActionTypes.CATEGORY_FETCHING_FALSE,
});
