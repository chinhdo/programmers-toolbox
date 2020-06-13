import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDKWlEqG2F6rmT7SKVzZtxpn70k9yjKAVw',
  authDomain: 'programmers-toolbox.firebaseapp.com',
  databaseURL: 'https://programmers-toolbox.firebaseio.com',
  projectId: 'programmers-toolbox',
  storageBucket: 'programmers-toolbox.appspot.com',
  messagingSenderId: '274626777839',
  appId: '1:274626777839:web:7a0c447edb47a56abb411a',
  measurementId: 'G-L73L8DSN5R',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async ({
  userAuth,
  additionalData,
}: {
  userAuth: firebase.User;
  additionalData: Record<string, unknown> | null;
}): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | null> => {
  if (!userAuth) return null;

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
        ...additionalData,
      });
    } catch (error) {
      console.error('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = (): Promise<firebase.auth.UserCredential> => auth.signInWithPopup(provider);

export default firebase;
