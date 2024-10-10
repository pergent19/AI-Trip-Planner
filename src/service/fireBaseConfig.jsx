import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDYmEQ59ttXWzZtup4i-NoKud2ozJafJwg",
  authDomain: "ai-travel-planner-1fed8.firebaseapp.com",
  databaseURL: "https://ai-travel-planner-1fed8-default-rtdb.firebaseio.com",
  projectId: "ai-travel-planner-1fed8",
  storageBucket: "ai-travel-planner-1fed8.appspot.com",
  messagingSenderId: "264781983801",
  appId: "1:264781983801:web:597d29fc0daed1bcb45de8",
  measurementId: "G-4T5N7RM1XP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);