import { firestore } from "./firebase-root";
import { FB_CONSTANTS } from "./firebase-constants";

export const firebase_fetch_public_stories = async () => {
  try {
    let arr = await firestore.collection(FB_CONSTANTS.STORIES).get();
    let docs = arr.docs.map((el) => el.data());
    if (docs && docs.length) docs.filter((el) => el.is_public === true);
    if (docs.length) {
      let result = await Promise.all(
        docs.map(
          async (el) =>
            await firestore
              .collection(FB_CONSTANTS.USER)
              .doc(el.user_id)
              .collection(FB_CONSTANTS.USER_STORIES)
              .doc(el.own_id)
              .get()
        )
      );
      return result.map((el) => el.data());
    }
  } catch (e) {
    console.log(e);
  }
};
export const firebase_add_public = async (story) => {
  if (!story) return;
  const {
    user_id,
    user_name,
    user_ava,
    is_public,
    color,
    own_id,
    title,
    anonymous,
  } = story;

  let pubStory = firestore.collection(FB_CONSTANTS.STORIES).doc(own_id);
  if (!pubStory.exists)
    try {
      let createdAt = new Date().toLocaleDateString();
      pubStory.set({
        color,
        user_id,
        user_name,
        user_ava,
        is_public,
        reactions: [],
        anonymous,
        title,
        color,
        own_id,
        createdAt,
      });
      let newstory = await pubStory.get();
      return newstory.data();
    } catch (e) {
      console.log(e);
    }
  else alert("already exists");
};

export const toggle_story_public = async (story) => {
  if (!story) return;
  try {
    let storyPubRef = firestore
      .collection(FB_CONSTANTS.STORIES)
      .doc(story.own_id);
    if (storyPubRef.exists) {
      await storyPubRef.update(story);
    } else {
      await firebase_add_public(story);
    }
  } catch (e) {
    console.log(e);
  }
};

export const firebase_update_user_story = async (story) => {
  if (!story) return;
  let storyRef = firestore
    .collection(FB_CONSTANTS.USER)
    .doc(story.user_id)
    .collection(FB_CONSTANTS.USER_STORIES)
    .doc(story.own_id);
  try {
    if (storyRef.id) await storyRef.update(story);
    let updated = await storyRef.get();
    return updated.data();
  } catch (err) {
    console.log(err);
  }
};

export const firebase_init_user_stories = async (user_id) => {
  let storiesArr = [];
  try {
    let stories = await firestore
      .collection(FB_CONSTANTS.USER)
      .doc(user_id)
      .collection(FB_CONSTANTS.USER_STORIES)
      .get();

    if (stories.docs.length) storiesArr = stories.docs.map((el) => el.data());
    return storiesArr;
  } catch (e) {
    return e;
  }
};

export const firebase_add_story = async (story) => {
  if (!story) return;
  const { user_id } = story;
  const createdAt = new Date().toLocaleDateString();
  let storyRef = firestore
    .collection(FB_CONSTANTS.USER)
    .doc(user_id)
    .collection(FB_CONSTANTS.USER_STORIES)
    .doc();
  const own_id = storyRef.id;
  try {
    await storyRef.set({
      ...story,
      own_id,
      user_id,
      createdAt,
    });
    let update = await storyRef.get();
    return update.data();
  } catch (err) {
    console.log(err);
  }
};
