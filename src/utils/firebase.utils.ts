import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDKWlEqG2F6rmT7SKVzZtxpn70k9yjKAVw",
  authDomain: "programmers-toolbox.firebaseapp.com",
  databaseURL: "https://programmers-toolbox.firebaseio.com",
  projectId: "programmers-toolbox",
  storageBucket: "programmers-toolbox.appspot.com",
  messagingSenderId: "274626777839",
  appId: "1:274626777839:web:7a0c447edb47a56abb411a",
  measurementId: "G-L73L8DSN5R"
};

firebase.initializeApp(config);

// TODO any
export const createUserProfileDocument = async (userAuth: any, additionalData: any) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
