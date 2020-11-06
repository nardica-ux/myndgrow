export const storyActionTypes = {
  INIT_STORIES: "INIT_STORIES",
  SET_STORY_DRAFT: "SET_STORY_DRAFT",
};

export const init_stories = (arr) => ({
  type: storyActionTypes.INIT_STORIES,
  payload: arr,
});

export const add_story_draft = (story) => ({
  type: storyActionTypes.SET_STORY_DRAFT,
  payload: story,
});
