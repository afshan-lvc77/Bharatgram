import { db, auth } from "./firebase.js";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// URL se target user ki ID nikalna (?id=USER_ID)
const urlParams = new URLSearchParams(window.location.search);
const receiverId = urlParams.get('id');
const senderId = auth.currentUser?.uid;

// Unique Chat ID banana
const chatId = [senderId, receiverId].sort().join("_");

// 1. Message Bhejna
window.sendMessage = async () => {
    const text = document.getElementById("msg-input").value;
    if (!text.trim()) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
        senderId: senderId,
        text: text,
        timestamp: serverTimestamp()
    });
    document.getElementById("msg-input").value = "";
};

// 2. Real-time Messages Load Karna
function loadMessages() {
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp", "asc"));

    onSnapshot(q, (snapshot) => {
        const msgContainer = document.getElementById("chat-messages");
        msgContainer.innerHTML = "";
        snapshot.forEach((doc) => {
            const msg = doc.data();
            const side = msg.senderId === senderId ? "sent" : "received";
            msgContainer.innerHTML += `<div class="message ${side}">${msg.text}</div>`;
        });
        msgContainer.scrollTop = msgContainer.scrollHeight; // Auto scroll to bottom
    });
}

auth.onAuthStateChanged(user => { if(user) loadMessages(); });

