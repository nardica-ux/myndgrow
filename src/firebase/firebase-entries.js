import { firestore } from "./firebase-root";

export const addEntryFire = async (entry) => {
  if (!entry) return;

  const entryRef = firestore
    .collection(`users/${entry.user_id}/user_entries`)
    .doc();
  const { text, topic, user_id, value, group_id } = entry;
  const createdAt = new Date().toLocaleDateString();
  const own_id = entryRef.id;
  try {
    await entryRef.set({
      own_id,
      user_id,
      topic,
      value,
      createdAt,
      text,
      group_id,
    });
    let entryData = await entryRef.get();
    return entryData.data();
  } catch (err) {
    console.log("error creating entry ", err.message);
  }
};
export const deleteEntryFire = async (entry) => {
  if (!entry) return;
  try {
    await firestore
      .collection(`users/${entry.user_id}/user_entries`)
      .doc(entry.own_id)
      .delete();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const fetch_entries = async (user) => {
  try {
    if (!user) return [];
    let entries = await firestore
      .collection(`users/${user.own_id}/user_entries`)
      .get();
    let updated = entries.docs.map((el) => el.data());
    return updated;
  } catch (err) {
    console.log(err);
  }
};
export const updateEntryFire = async (entry) => {
  try {
    let snapshot = firestore
      .collection(`users/${entry.user_id}/user_entries`)
      .doc(entry.own_id);
    if (snapshot.id) await snapshot.update(entry);
    let renewed = await snapshot.get();
    return renewed.data();
  } catch (err) {
    console.log(err);
  }
};
