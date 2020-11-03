import { categoryActionTypes } from "./category-actions";

const INITIAL_STATE = {
  categories: [],
  errorEntry: null,
  updatedId: undefined,
  fetching: false,
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case categoryActionTypes.INIT_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        errorEntry: null,
      };
    case categoryActionTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case categoryActionTypes.UPDATE_CATEGORY_SUCCESS: {
      let updated = [...state.categories];
      let index;
      state.categories.find((el, i) => {
        if (el.own_id === action.payload.own_id) index = i;
      });
      updated[index] = action.payload;
      return {
        ...state,
        categories: updated,
      };
    }
    case categoryActionTypes.CATEGORY_FETCHING_TRUE:
      return {
        ...state,
        fetching: action.payload,
      };

    case categoryActionTypes.CATEGORY_FETCHING_FALSE:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
