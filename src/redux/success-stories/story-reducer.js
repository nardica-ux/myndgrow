import { storyActionTypes } from "./story-actions";
import { stories } from "../../components/success-stories/story-sample.js";

const INITIAL_STATE = {
  new_draft: null,
  errorStory: null,
  user_stories: [...stories],
  stories_drafts: [],
  updatedId: undefined,
};
const storyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case storyActionTypes.SET_STORY_DRAFT:
      return {
        ...state,
        new_draft: action.payload,
      };
    case storyActionTypes.INIT_STORIES:
      return {
        ...state,
        user_stories: action.payload,
      };
    default:
      return state;
  }
};
export default storyReducer;
