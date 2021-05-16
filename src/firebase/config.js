import Firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";
import 'firebase/storage';

const config = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
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
