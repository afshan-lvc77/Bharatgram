const firebaseConfig = {
  apiKey: "AIzaSyBKJQAKA7Y5IuUhGpoHApGIYrYkBBTpimE",
  authDomain: "bharatgram-f7b1e.firebaseapp.com",
  projectId: "bharatgram-f7b1e",
  storageBucket: "bharatgram-f7b1e.firebasestorage.app",
  messagingSenderId: "21690538326",
  appId: "1:21690538326:web:3910ea058afe20a474def7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
