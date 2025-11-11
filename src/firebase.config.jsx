// Import the functions you need from the SDKs you need
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwCg-ojA7VywHR5j3syZRcDib22YOX1gk",
  authDomain: "freelance-5d291.firebaseapp.com",
  projectId: "freelance-5d291",
  storageBucket: "freelance-5d291.firebasestorage.app",
  messagingSenderId: "854376337767",
  appId: "1:854376337767:web:55da494f9cfbfb82ce1fc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;