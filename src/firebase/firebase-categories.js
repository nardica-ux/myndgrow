import { firestore } from "./firebase-root";
import { FB_CONSTANTS } from "./firebase-constants";

export const addCategoryFire = async (category) => {
  if (!category) return;
  const categoryRef = firestore
    .collection(`users/${category.user_id}/user_categories`)
    .doc();
  const createdAt = new Date().toLocaleDateString();
  const own_id = categoryRef.id;
  try {
    await categoryRef.set({
      own_id,
      user_id: category.user_id,
      goal: category.goal,
      name: category.name,
      question: category.question,
      createdAt,
      color: category.color,
    });
    let categoryData = await categoryRef.get();
    return categoryData.data();
  } catch (err) {
    return err;
  }
};
export const fetchUserCategories = async (id) => {
  if (!id) return;
  try {
    const categoryRef = await firestore
      .collection(`users/${id}/user_categories`)
      .get();
    let result = categoryRef.docs.map((el) => el.data());
    return result;
  } catch (err) {
    return err;
  }
};

export const updateCategoryFire = async (category) => {
  try {
    let snapshot = firestore
      .collection(
        `${FB_CONSTANTS.USER}/${category.user_id}/${FB_CONSTANTS.USER_CATEGORIES}`
      )
      .doc(category.own_id);
    if (snapshot.id) await snapshot.update(category);
    let renewed = await snapshot.get();
    return renewed.data();
  } catch (err) {
    return err;
  }
};
