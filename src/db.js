import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: "twitter-firebase-bac96.firebaseapp.com",
  projectId: "twitter-firebase-bac96",
  storageBucket: "twitter-firebase-bac96.appspot.com",
  messagingSenderId: process.env.VUE_APP_SENDER_ID,
  appId: "1:234172260570:web:9e586444de0706f44805e3",
};

process.env.VUE_APP_API_KEY;

initializeApp(firebaseConfig);
