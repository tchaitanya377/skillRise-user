import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// const firebaseConfig = {
//   apiKey: "AIzaSyA6hi5WniSmIBsPCwcqk_QVizh8yHcYM88",
//   authDomain: "ravuru-ccbcd.firebaseapp.com",
//   projectId: "ravuru-ccbcd",
//   storageBucket: "ravuru-ccbcd.appspot.com",
//   messagingSenderId: "438776822141",
//   appId: "1:438776822141:web:31b8db8d2b789959003414",
//   measurementId: "G-9TDRW616T8"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBO-0m_dczIjwuiU8fj0-ZaWLUthpBQV3U",
  authDomain: "skillrise-52dfc.firebaseapp.com",
  projectId: "skillrise-52dfc",
  storageBucket: "skillrise-52dfc.appspot.com",
  messagingSenderId: "470730494073",
  appId: "1:470730494073:web:fdce2029cb61cac3a9c4a8",
  measurementId: "G-NMHWJW0E51"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };