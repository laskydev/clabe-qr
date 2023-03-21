// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1ZzXC-vb_v4k-lvkYPW_LBaerAU8XZUs",
    authDomain: "clabe-qr.firebaseapp.com",
    projectId: "clabe-qr",
    storageBucket: "clabe-qr.appspot.com",
    messagingSenderId: "535784374396",
    appId: "1:535784374396:web:d0c623d354c3af852c89f9",
    measurementId: "G-3N6DB4CXYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
