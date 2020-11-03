import { firestore } from "./firebase-root";

export const testUserEntries = async (user) => {
  if (!user) return;
  try {
    let test = await firestore
      .collection("users")
      .doc(user.own_id)
      .collection("user_entries")
      .get();
    console.log(test.docs.map((el) => el.data()));
  } catch (err) {
    console.log(err);
  }
};
