import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AiZaSyBKJQAKA7Y5IuUhGpoHAPGiYrYkBBTpime",
  authDomain: "bharatgram-f7b1e.firebaseapp.com",
  databaseURL: "https://bharatgram-f7b1e-default-rtdb.firebaseio.com",
  projectId: "bharatgram-f7b1e",
  storageBucket: "bharatgram-f7b1e.firebasestorage.app",
  messagingSenderId: "21690538326",
  appId: "1:21690538326:web:3910ea058afe20a474def7",
  measurementId: "G-7GZCGTKRY7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

