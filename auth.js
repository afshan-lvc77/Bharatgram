import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.signup = async function() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if(!username || !email || !password) {
        alert("Saari fields bharo bhai!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // SMART DATABASE SETUP: Ye line followers system ko solid banati hai
        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
            uid: user.uid,
            profilePic: "https://via.placeholder.com/150",
            bio: "Jai Hind! Bharatgram user.",
            followers: [], // Khali followers list
            following: []  // Khali following list
        });

        alert("Account Created Successfully!");
        window.location.href = "../index.html"; 
    } catch (error) {
        alert("Error: " + error.message);
    }
}

