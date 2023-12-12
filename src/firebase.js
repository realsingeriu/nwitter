import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_ACCESS_NWITTER_API_KEY,
  authDomain: "nwitter-bae.firebaseapp.com",
  projectId: "nwitter-bae",
  storageBucket: "nwitter-bae.appspot.com",
  messagingSenderId: "740194171531",
  appId: "1:740194171531:web:574f720a3d3c216d91b28e",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// 인증객체
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };
