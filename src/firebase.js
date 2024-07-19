// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBzX3AlUzm8YvZLaM9b_G_xcIuwDEjCC1M",
  authDomain: "clone-yt-c5a57.firebaseapp.com",
  projectId: "clone-yt-c5a57",
  storageBucket: "clone-yt-c5a57.appspot.com",
  messagingSenderId: "508299207632",
  appId: "1:508299207632:web:86c71d1bea0a198ed48fd5",
  measurementId: "G-R9STV7LXJM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
