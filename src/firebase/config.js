import Firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyBR3B24TKXflq38A5ce879C76WBuv5XRAA',
  authDomain: 'react-project-62afa.firebaseapp.com',
  projectId: 'react-project-62afa',
  storageBucket: 'react-project-62afa.appspot.com',
  messagingSenderId: '1044991478389',
  appId: '1:1044991478389:web:a8afc5de81b3890b58463c'
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
