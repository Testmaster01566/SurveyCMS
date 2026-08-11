import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAhVKiHVLSU1bFfoGE4Hm2Z0-UCcQD7YUI",
  authDomain: "surveycms.firebaseapp.com",
  projectId: "surveycms",
  storageBucket: "surveycms.firebasestorage.app",
  messagingSenderId: "52495956563",
  appId: "1:52495956563:web:47f5f2b48b2d18091724a6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };