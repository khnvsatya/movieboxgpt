// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYwyMXSKC15ABQcJQmRngTjVI7bOtgmF4",
  authDomain: "movieboxgpt.firebaseapp.com",
  projectId: "movieboxgpt",
  storageBucket: "movieboxgpt.appspot.com",
  messagingSenderId: "795765555163",
  appId: "1:795765555163:web:2774beab1e22bb303971fe",
  measurementId: "G-ZSPFS6MFLS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
