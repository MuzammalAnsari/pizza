// src/utils/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics"; // Import getAnalytics and isSupported

const firebaseConfig = {
  apiKey: "AIzaSyDYb7nbVx2zxHYhz8hurS-8K7QQ7r0wAcA",
  authDomain: "food-ordering-1-d5a63.firebaseapp.com",
  projectId: "food-ordering-1-d5a63",
  storageBucket: "food-ordering-1-d5a63.appspot.com",
  messagingSenderId: "909885188710",
  appId: "1:909885188710:web:c70e8a58c3fdc3cb4e5ba7",
  measurementId: "G-0L9F4Z18F6"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Get Auth, Firestore, and Storage instances
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Conditionally initialize Analytics if supported
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { auth, firestore, storage, analytics };
