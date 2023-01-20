// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9impDYKs4JX9MRftUS_RdgXd6VHGAIBc",
  authDomain: "project-dmi.firebaseapp.com",
  projectId: "project-dmi",
  storageBucket: "project-dmi.appspot.com",
  messagingSenderId: "499794031439",
  appId: "1:499794031439:web:712792dc7be6964a3bcb3a",
  measurementId: "G-SVKF2PTXLG"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
