// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  // prueba

  apiKey: "AIzaSyBMJB0CWO1EaBW6guLFRuGqVrKNvcK-ZXY",
  authDomain: "prueba-fe655.firebaseapp.com",
  projectId: "prueba-fe655",
  storageBucket: "prueba-fe655.appspot.com",
  messagingSenderId: "259493365401",
  appId: "1:259493365401:web:ff3322745152fedcb15a08"

  // WhatsApp

  // apiKey: "AIzaSyCWMtaCileXQ4rvy6J_Tt4MVpR1R6sYQOI",
  // authDomain: "whatsapp-7167c.firebaseapp.com",
  // projectId: "whatsapp-7167c",
  // storageBucket: "whatsapp-7167c.appspot.com",
  // messagingSenderId: "975666807029",
  // appId: "1:975666807029:web:37231723d4f2b682b145bc",
  // measurementId: "G-EWHC1FG79T"

  //  whatsApp2

  // apiKey: "AIzaSyB8HEcCH5dX_kT9HBeSZrQKEAgp1ZShRpk",
  // authDomain: "whatsapp2-e4b4f.firebaseapp.com",
  // projectId: "whatsapp2-e4b4f",
  // storageBucket: "whatsapp2-e4b4f.appspot.com",
  // messagingSenderId: "659992234185",
  // appId: "1:659992234185:web:3e45532c9c33f0a4202518"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

