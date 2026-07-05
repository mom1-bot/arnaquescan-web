import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:            "AIzaSyBpAqRpxcWfELMurCkbub0pY3cF_5PcBTE",
  authDomain:        "arnaquescan.firebaseapp.com",
  projectId:         "arnaquescan",
  storageBucket:     "arnaquescan.firebasestorage.app",
  messagingSenderId: "502788353399",
  appId:             "1:502788353399:web:f50723eeddfda740628572",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db   = getFirestore(app);
