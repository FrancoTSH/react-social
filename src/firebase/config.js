import Firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const firebase = Firebase.initializeApp(config);

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()
export const authGoogle = new Firebase.auth.GoogleAuthProvider();
export const authFacebook = new Firebase.auth.FacebookAuthProvider();
export const authPersistence = Firebase.auth.Auth.Persistence;
export const authProvider = Firebase.auth.EmailAuthProvider;
export const FieldValue = Firebase.firestore.FieldValue;
export default firebase;
