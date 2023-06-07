// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhyRkJ6lrXUh2Iio6YEr5BAeWzlbF1YF4",
  authDomain: "asdf-6dfbb.firebaseapp.com",
  projectId: "asdf-6dfbb",
  storageBucket: "asdf-6dfbb.appspot.com",
  messagingSenderId: "674122100969",
  appId: "1:674122100969:web:bfa26052a332bc62dac078",
  measurementId: "G-6VVFT909WR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getAnalytics(app);
const authService = getAuth(app);

export { fireStore, firebaseConfig };
