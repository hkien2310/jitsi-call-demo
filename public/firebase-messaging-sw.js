// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDlAHrV2VEk0_NGwOhbQbV_Sa-Msenlnwc",
  authDomain: "jitsicallpj.firebaseapp.com",
  projectId: "jitsicallpj",
  storageBucket: "jitsicallpj.appspot.com",
  messagingSenderId: "613694368545",
  appId: "1:613694368545:web:7907c8b46fc3dcd7d2ac60",
  measurementId: "G-57RT1MT1XD"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function (payload) {
  const channel = new BroadcastChannel("fcm-background-channel");
  channel.postMessage({ type: "FCM_BACKGROUND_MESSAGE", payload });

  // self.clients.matchAll().then((clients) => {
  //   console.log('Received background message:', payload, clients);
  //   clients.forEach((client) => {
  //     client.postMessage({
  //       type: 'FIREBASE_MESSAGE',
  //       payload: payload,
  //     });
  //   });
  // });

});