import { auth, authFacebook, authGoogle, authPersistence, authProvider, storage } from 'firebase/config';
import React, { useContext, useEffect, useState } from 'react';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true)

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const signUpWithGoogle = () => {
    return auth.signInWithPopup(authGoogle);
  }

  const signUpWithFacebook = () => {
    return auth.signInWithPopup(authFacebook);
  }

  const logIn = async (email, password, persistence) => {
    return auth.setPersistence(persistence ? authPersistence.LOCAL : authPersistence.SESSION)
      .then(() => auth.signInWithEmailAndPassword(email, password));
  }

  const logOut = () => {
    return auth.signOut();
  }

  const updateUser = async ({ displayName, photoURL }) => {
    if (typeof photoURL === 'object') {
      const storageRef = storage.ref(`profilePictures/${photoURL.name}`)
      const snapshot = await storageRef.put(photoURL);
      const imageURL = await snapshot.ref.getDownloadURL();
      photoURL = imageURL;
    }
    console.log('https://firebasestorage.googleapis.com/v0/b/react-project-62afa.appspot.com/o/profilePictures%2Fpbjx3Z5zTgbuPp7rTlAk99lrnEr1.png?alt=media&token=c973803a-2865-474f-b681-e3bf08ec9ed1')
    return auth.currentUser.updateProfile({ displayName, photoURL })
  }

  const updateUserPassword = async (oldPass, newPass) => {
    const credentials = authProvider.credential(auth.currentUser.email, oldPass)
    return auth.currentUser.reauthenticateWithCredential(credentials)
      .then(res => res.user.updatePassword(newPass));
  }

  const verifyCode = (code) => {
    return auth.verifyPasswordResetCode(code);
  }

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  }

  const changePassword = (code, password) => {
    return auth.confirmPasswordReset(code, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    logIn,
    signUp,
    signUpWithGoogle,
    signUpWithFacebook,
    logOut,
    verifyCode,
    resetPassword,
    changePassword,
    updateUser,
    updateUserPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

