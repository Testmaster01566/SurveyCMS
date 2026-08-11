import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAhVKiHVLSU1bFfoGE4Hm2Z0-UCcQD7YUI",
  authDomain: "surveycms.firebaseapp.com",
  projectId: "surveycms",
  storageBucket: "surveycms.firebasestorage.app",
  messagingSenderId: "52495956563",
  appId: "1:52495956563:web:47f5f2b48b2d18091724a6",
  measurementId: "G-6QGNCMKDG7"
};

const app = initializeApp(firebaseConfig);

export { app };