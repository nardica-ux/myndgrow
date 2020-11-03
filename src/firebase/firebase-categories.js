import { firestore } from "./firebase-root";

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
    console.log("error creating meeting ", err.message);
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
    console.log(err.message);
  }
};

export const updateCategoryFire = async (Category) => {
  try {
    let snapshot = firestore
      .collection(`users/${Category.user_id}/user_categories`)
      .doc(Category.own_id);
    if (snapshot.id) await snapshot.update(Category);
    let renewed = await snapshot.get();
    return renewed.data();
  } catch (err) {
    console.log(err);
  }
};
