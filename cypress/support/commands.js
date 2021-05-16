import firebase from 'firebase';

const config = {
  apiKey: Cypress.env("REACT_APP_FIREBASE_API_KEY"),
  authDomain: Cypress.env("REACT_APP_FIREBASE_AUTH_DOMAIN"),
  projectId: Cypress.env("REACT_APP_FIREBASE_PROJECT_ID"),
  storageBucket: Cypress.env("REACT_APP_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: Cypress.env("REACT_APP_FIREBASE_MESSAGING_SENDER_ID"),
  appId: Cypress.env("REACT_APP_FIREBASE_APP_ID")
};

firebase.initializeApp(config)

Cypress.Commands.add('login', (email, password) => {
  return firebase.default.auth().signInWithEmailAndPassword(email, password);
})
