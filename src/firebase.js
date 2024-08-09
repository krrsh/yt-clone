// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB9h1bBx9z8gWKnRaipiHm4-XonWiA7zsQ",
  authDomain: "yt-clone-d97ec.firebaseapp.com",
  projectId: "yt-clone-d97ec",
  storageBucket: "yt-clone-d97ec.appspot.com",
  messagingSenderId: "299842459752",
  appId: "1:299842459752:web:8e79e68f6c19991d4603dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
const timestamp = serverTimestamp();

export {app, db, auth, provider, timestamp}