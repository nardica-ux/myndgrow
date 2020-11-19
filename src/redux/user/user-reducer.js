import { userActionTypes } from "./user-actions";
const INITIAL_STATE = {
  user: {
    own_id: null,
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
