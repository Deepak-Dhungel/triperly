import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7jFmgIdsAuwshCmvx9p6momeAeAOsPHw",
  authDomain: "triperly-81d51.firebaseapp.com",
  projectId: "triperly-81d51",
  storageBucket: "triperly-81d51.appspot.com",
  messagingSenderId: "416584520850",
  appId: "1:416584520850:web:40609017a0ae99cd54824b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);