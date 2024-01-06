// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbww83q1dC0NTd8xntuIFwvxSn-ENRz4Y",
  authDomain: "photofolio-c27a5.firebaseapp.com",
  projectId: "photofolio-c27a5",
  storageBucket: "photofolio-c27a5.appspot.com",
  messagingSenderId: "527026264828",
  appId: "1:527026264828:web:57761904656753a0101579"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;