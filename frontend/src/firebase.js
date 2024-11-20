// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwx9fsNpLueOsLQPyn17otnZSo-qmNCzo",
  authDomain: "task-management-35dc3.firebaseapp.com",
  projectId: "task-management-35dc3",
  storageBucket: "task-management-35dc3.firebasestorage.app",
  messagingSenderId: "691444588243",
  appId: "1:691444588243:web:d0dcef35e9581aebeb3e26",
  measurementId: "G-N15YRQFM8H"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
// const analytics = getAnalytics(app);