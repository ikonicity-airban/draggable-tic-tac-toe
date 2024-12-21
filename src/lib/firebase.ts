// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, } from "firebase/analytics";
import { getDatabase, } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXcyEyBXkDH7Skgz-UrwRfW4DwaYanjjo",
  authDomain: "ikonicity-demo-apps.firebaseapp.com",
  projectId: "ikonicity-demo-apps",
  storageBucket: "ikonicity-demo-apps.firebasestorage.app",
  messagingSenderId: "116695218114",
  appId: "1:116695218114:web:b100801ca2a86c864f485b",
  measurementId: "G-L9ZMJ0LTBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getDatabase(app);

export { db, analytics, auth };