import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_ACCESS_NWITTER_API_KEY,
  authDomain: "nwitter-drv98.firebaseapp.com",
  projectId: "nwitter-drv98",
  storageBucket: "nwitter-drv98.appspot.com",
  messagingSenderId: "97502061943",
  appId: "1:97502061943:web:7cb2ec968760b4e7a3ad72",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// 인증객체
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };
