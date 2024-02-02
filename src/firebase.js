// Firebase Cloud Messaging Configuration File. 
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { onBackgroundMessage } from "firebase/messaging/sw";

var firebaseConfig = {
    apiKey: "AIzaSyDlAHrV2VEk0_NGwOhbQbV_Sa-Msenlnwc",
    authDomain: "jitsicallpj.firebaseapp.com",
    projectId: "jitsicallpj",
    storageBucket: "jitsicallpj.appspot.com",
    messagingSenderId: "613694368545",
    appId: "1:613694368545:web:7907c8b46fc3dcd7d2ac60",
    measurementId: "G-57RT1MT1XD"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = async () => {
    try {
        const currentToken = await getToken(messaging, { vapidKey: `BJZBWSgyDYIYZXtc7W0cyzFjXPFT1Sm_svdO1AlFi5g1fEOjQ79953bI5JW2wwgbgIliAoi2qsyB5xc6OpsiRtk` });
        if (currentToken) {
            console.log('current token for client: ', currentToken);
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
        }
    } catch (err) {
        console.log('An error occurred while retrieving token. ', err);
    }
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log('onMessageListener', payload);
            resolve(payload);
        });
    });

export const onBackgroundMessageListener = () =>
    new Promise((resolve) => {
        onBackgroundMessage(messaging, (payload) => {
            console.log('onBackgroundMessageListener', payload);
            resolve(payload);
        });
    });
