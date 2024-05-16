// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuGx3QlFw6MaQlwAOrP-a5vlFejpVTC3g",
  authDomain: "app-fyp-d655b.firebaseapp.com",
  databaseURL: "https://app-fyp-d655b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "app-fyp-d655b",
  storageBucket: "app-fyp-d655b.appspot.com",
  messagingSenderId: "966670678661",
  appId: "1:966670678661:web:e3e28a7e428461e78b87ec",
  measurementId: "G-RQ6BFR7ZHM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
