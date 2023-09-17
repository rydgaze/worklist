import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCqDmAeizPsn11Qnl9SI0s0XPEFJ6-78s8",
    authDomain: "worklist-cdbd4.firebaseapp.com",
    projectId: "worklist-cdbd4",
    storageBucket: "worklist-cdbd4.appspot.com",
    messagingSenderId: "189832330827",
    appId: "1:189832330827:web:a01c1203d51cf60a7897ce"
  };


  // Initialize firebase object
  firebase.initializeApp(firebaseConfig)

  // DB
  const db = firebase.firestore()

  // Auth
  const auth  = firebase.auth()


  // Server teamsstamp
  const ts = firebase.firestore.FieldValue.serverTimeStamp

  export { db, auth, ts }


