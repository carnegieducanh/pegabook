// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAOHoE_yRsZBl5P6SZUOe3fSo_9Sm906Y",
    authDomain: "book-store-pegatron.firebaseapp.com",
    projectId: "book-store-pegatron",
    storageBucket: "book-store-pegatron.appspot.com",
    messagingSenderId: "649270420133",
    appId: "1:649270420133:web:275cb86d0b8ec6392b634c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
