import {
  addEntryFire,
  deleteEntryFire,
  fetch_entries,
  updateEntryFire,
} from "../firebase/firebase-entries";

export const entryActionTypes = {
  FAKE_DATA: "FAKE_DATA",

  ADD_ENTRY_SUCCESS: "ADD_ENTRY_SUCCESS",
  ADD_ENTRY_FAILURE: "ADD_ENTRY_FAILURE",
  ADD_ENTRY_DONE: "ADD_ENTRY_DONE",

  DELETE_ENTRY_REDUX: "DELETE_ENTRY_REDUX",
  INIT_ENTRIES: "INIT_ENTRIES",

  UPDATE_ENTRY_SUCCESS: "UPDATE_ENTRY_SUCCESS",
  UPDATE_ENTRY_FAILURE: "UPDATE_ENTRY_FAILURE",
};
export const init_fake_data = (num) => ({
  type: entryActionTypes.FAKE_DATA,
  payload: num,
});

export const add_entry = (entry) => {
  return async (dispatch) => {
    try {
      let entryNew = await addEntryFire(entry);
      console.log(entry, entryNew);
      dispatch(add_entry_success(entryNew));
      return "OK";
    } catch (err) {
      dispatch(add_entry_failure(err));
    }
  };
};

export const delete_entry = (entry) => {
  return async (dispatch) => {
    try {
      let result = await deleteEntryFire(entry);
      console.log(result);
      if (result) dispatch(delete_entry_redux(entry));
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
};
export const delete_entry_redux = (entry) => ({
  type: entryActionTypes.DELETE_ENTRY_REDUX,
  payload: entry,
});

export const add_entry_success = (el) => ({
  type: entryActionTypes.ADD_ENTRY_SUCCESS,
  payload: el,
});
export const add_entry_failure = (err) => ({
  type: entryActionTypes.ADD_ENTRY_FAILURE,
  payload: err,
});

export const refresh_entries_redux = (user) => {
  return async (dispatch) => {
    try {
      if (user) {
        let updated = await fetch_entries(user);
        dispatch(init_entries(updated));
      } else dispatch(init_entries([]));
    } catch (err) {
      dispatch(update_entry_failure(err));
    }
  };
};
export const init_entries = (arr) => ({
  type: entryActionTypes.INIT_ENTRIES,
  payload: arr,
});
export const update_entry = (entry) => {
  return async (dispatch) => {
    try {
      let update = await updateEntryFire(entry);
      if (update) dispatch(update_entry_sucess(update));
      return update;
    } catch (err) {
      dispatch(update_entry_failure(err));
    }
  };
};
const update_entry_sucess = (el) => ({
  type: entryActionTypes.UPDATE_ENTRY_SUCCESS,
  payload: el,
});
const update_entry_failure = (err) => ({
  type: entryActionTypes.UPDATE_ENTRY_FAILURE,
  payload: err,
});
