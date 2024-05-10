import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAR_LAO7bBsBmq4E7rXIpazEjD1m2fl5MI",
    authDomain: "studentmanagementsystem-2024.firebaseapp.com",
    projectId: "studentmanagementsystem-2024",
    storageBucket: "studentmanagementsystem-2024.appspot.com",
    messagingSenderId: "186477032118",
    appId: "1:186477032118:web:21222bcf3b470b7859ec17"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };