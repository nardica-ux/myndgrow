import { storyActionTypes } from "./story-actions";

const INITIAL_STATE = {
  new_draft: null,
  errorStory: null,
  user_stories: [],
  stories_drafts: [],
  updatedId: undefined,
  public_stories: [],
};
const storyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case storyActionTypes.PUBLIC_STORIES_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        public_stories: action.payload,
      };
    }
    case storyActionTypes.UPDATE_USER_STORY_SUCCESS: {
      let update = state.user_stories.map((el) =>
        el.own_id === action.payload.own_id ? action.payload : el
      );
      return {
        ...state,
        user_stories: update,
      };
    }
    case storyActionTypes.SET_STORY_DRAFT:
      return {
        ...state,
        new_draft: action.payload,
      };
    case storyActionTypes.INIT_USER_STORIES_SUCCESS: {
      return {
        ...state,
        user_stories: action.payload,
      };
    }
    case storyActionTypes.SUBMIT_STORY_SUCCESS:
      return {
        ...state,
        user_stories: [...state.user_stories, action.payload],
      };
    case storyActionTypes.SUBMIT_STORY_FAIL:
      return {
        ...state,
        errorStory: action.payload,
      };
    default:
      return state;
  }
};
export default storyReducer;
