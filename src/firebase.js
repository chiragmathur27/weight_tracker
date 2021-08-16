import firebase from "firebase";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyA8GCauxNKTlAzVg7Cg4pX80UB0dzpoRV0",
  authDomain: "weight-tracker-e9d64.firebaseapp.com",
  projectId: "weight-tracker-e9d64",
  storageBucket: "weight-tracker-e9d64.appspot.com",
  messagingSenderId: "698762248642",
  appId: "1:698762248642:web:c5d30b72edf7cafd98565b",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
export { db, firebase };
