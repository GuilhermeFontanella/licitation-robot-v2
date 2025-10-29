// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArMOuE5Y246O16_fVupjdukco8vmoZOr8",
  authDomain: "licita-robot-v2.firebaseapp.com",
  projectId: "licita-robot-v2",
  storageBucket: "licita-robot-v2.firebasestorage.app",
  messagingSenderId: "253896347445",
  appId: "1:253896347445:web:2bbc6a4c254519ddb2c67c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
