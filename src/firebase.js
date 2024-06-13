// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3iM7WhbFXib1cTyezw09QJUI-N6nWG6I",
  authDomain: "e-com-2-8eeff.firebaseapp.com",
  projectId: "e-com-2-8eeff",
  storageBucket: "e-com-2-8eeff.appspot.com",
  messagingSenderId: "623454646101",
  appId: "1:623454646101:web:d05fcdd77cff0fea3709dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
