import firebase from "firebase/app";
import "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDSL26vJtbKFCylo82sVceTRmbcTdNWtTk",
    authDomain: "etourism-256e3.firebaseapp.com",
    projectId: "etourism-256e3",
    storageBucket: "etourism-256e3.appspot.com",
    messagingSenderId: "564432474647",
    appId: "1:564432474647:web:e0cedf4a9995386cba4252",
    measurementId: "G-4C8Q45XELD"
  };
  firebase.initializeApp(firebaseConfig);
  const storage=firebase.storage();
  export {storage,firebase as default};