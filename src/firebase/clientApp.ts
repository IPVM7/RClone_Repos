// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXujcyK0PlZr6SnfsKxyKr30LtrtbjpUY",
  authDomain: "rclone-c8331.firebaseapp.com",
  projectId: "rclone-c8331",
  storageBucket: "rclone-c8331.appspot.com",
  messagingSenderId: "940787774351",
  appId: "1:940787774351:web:897a7ea7b8a343fd5511fa",
  measurementId: "G-GG8EFPZC52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);