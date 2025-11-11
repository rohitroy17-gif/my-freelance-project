import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getRedirectResult,
  signOut,
  updateProfile
} from "firebase/auth";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle BOTH normal login + mobile redirect login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    // Check redirect result (important for mobile)
    getRedirectResult(auth)
      .then(result => {
        if (result?.user) {
          setUser(result.user);
        }
      })
      .catch(err => console.log("Redirect Login Error:", err));

    return () => unsubscribe();
  }, []);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Modified Google Login: Popup for desktop, Redirect for mobile
  const googleLogin = () => {
    if (window.innerWidth < 768) {
      // Mobile Device → Redirect Login
      return signInWithRedirect(auth, googleProvider);
    } else {
      // Desktop → Popup Login
      return signInWithPopup(auth, googleProvider);
    }
  };

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, { displayName: name, photoURL });
  };

  const logOut = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        createUser,
        loginUser,
        googleLogin,
        updateUserProfile,
        logOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);



