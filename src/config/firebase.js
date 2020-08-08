import Firebase from 'firebase';
//import * as firebase from 'firebase';
//import 'firebase/firestore';

let firebaseConfig = {
  apiKey: "AIzaSyD3MtsSaSJgXjr_xlAIn81uRisWwLNSAN8",
  authDomain: "getjob-8c6bc.firebaseapp.com",
  databaseURL: "https://getjob-8c6bc.firebaseio.com",
  projectId: "getjob-8c6bc",
  storageBucket: "getjob-8c6bc.appspot.com",
  messagingSenderId: "407221360370",
  appId: "1:407221360370:web:fed9c21000d0a82881e26b",
  measurementId: "G-3TKN2VBVS8"
};
// Initialize Firebase
let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database()
export const auth = app.auth()
export const storage = app.storage()
