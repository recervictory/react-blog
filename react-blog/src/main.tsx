import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuojtatoErWr4SXjVEE_h2sLE_1njQBb8",
  authDomain: "react-blog-one.firebaseapp.com",
  projectId: "react-blog-one",
  storageBucket: "react-blog-one.appspot.com",
  messagingSenderId: "553558548057",
  appId: "1:553558548057:web:e9cb9345a37d609bc19b48",
  measurementId: "G-6CYS08K9P7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
