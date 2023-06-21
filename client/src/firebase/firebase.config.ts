// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCePrp71wBauJHJflyMzTc7IDL84-T2C2Q",
  authDomain: "facilmarket-a097d.firebaseapp.com",
  projectId: "facilmarket-a097d",
  storageBucket: "facilmarket-a097d.appspot.com",
  messagingSenderId: "381218689349",
  appId: "1:381218689349:web:9e7dc6672e7d309d1fae2c",
  measurementId: "G-704QQ37ELL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);