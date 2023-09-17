import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCqDmAeizPsn11Qnl9SI0s0XPEFJ6-78s8",
    authDomain: "worklist-cdbd4.firebaseapp.com",
    projectId: "worklist-cdbd4",
    storageBucket: "worklist-cdbd4.appspot.com",
    messagingSenderId: "189832330827",
    appId: "1:189832330827:web:a01c1203d51cf60a7897ce"
  };


  // Initialize firebase object
  initializeApp(firebaseConfig);

  // DB
  const db = getFirestore();

  // Auth
  const auth = getAuth();

  export { db, auth }



