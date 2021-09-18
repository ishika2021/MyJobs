import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDdwVGQ5FqwtQ0Gcnmb1BzKyU4MWVhXgF0",
  authDomain: "myjobs-6d75e.firebaseapp.com",
  projectId: "myjobs-6d75e",
  storageBucket: "myjobs-6d75e.appspot.com",
  messagingSenderId: "431316329523",
  appId: "1:431316329523:web:42a834ac19cd715528af46"
})

export const auth=firebase.auth();
const firestore=firebase.firestore();
export const database={
    users:firestore.collection('users'),
    getCurrentTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}
export const storage=firebase.storage();