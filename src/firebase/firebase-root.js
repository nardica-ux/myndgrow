import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDOvJZXjxbbw8OrAKfTo0072FjYACqSEwo",
  authDomain: "myndgrow.firebaseapp.com",
  databaseURL: "https://myndgrow.firebaseio.com",
  projectId: "myndgrow",
  storageBucket: "myndgrow.appspot.com",
  messagingSenderId: "319591351848",
  appId: "1:319591351848:web:2ae7f7a0e618512783171d",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, uid } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        own_id: uid,
        type: "user",
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user ", err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);
export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
