import { userActionTypes } from "./user-actions";
const INITIAL_STATE = {
  user: null,
};

const sampleUser = {
  createdAt: { seconds: 1600305630, nanoseconds: 326000000 },
  displayName: "Nadezhda Erokhina",
  email: "nardica@gmail.com",
  own_id: "eRbtsVWVY0TIxtlxn56kno0nJPx1",
  type: "user",
  modal_open: false,
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
