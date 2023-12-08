import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_ACCESS_NWITTER_API_KEY,
  authDomain: "nwitter-bae.firebaseapp.com",
  projectId: "nwitter-bae",
  storageBucket: "nwitter-bae.appspot.com",
  messagingSenderId: "740194171531",
  appId: "1:740194171531:web:574f720a3d3c216d91b28e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
