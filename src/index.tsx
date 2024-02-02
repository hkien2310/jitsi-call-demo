import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import 'firebase/database';
import firebase from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, onMessage } from "firebase/messaging";
import { getAuth } from 'firebase/auth';
import Notification from './Notification';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlAHrV2VEk0_NGwOhbQbV_Sa-Msenlnwc",
  authDomain: "jitsicallpj.firebaseapp.com",
  projectId: "jitsicallpj",
  storageBucket: "jitsicallpj.appspot.com",
  messagingSenderId: "613694368545",
  appId: "1:613694368545:web:7907c8b46fc3dcd7d2ac60",
  measurementId: "G-57RT1MT1XD"
};

export const vapikey = 'BJZBWSgyDYIYZXtc7W0cyzFjXPFT1Sm_svdO1AlFi5g1fEOjQ79953bI5JW2wwgbgIliAoi2qsyB5xc6OpsiRtk'
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const messaging = getMessaging(app);
// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
//   // ...
// });


root.render(
  <React.StrictMode>
    <App />
    {/* <Notification /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
