import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { storage, db, auth } from "./firebase.js";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.uploadPost = async () => {
    const file = document.getElementById("image-input").files[0];
    const caption = document.getElementById("caption-input").value;
    const btn = document.getElementById("upload-btn");

    if (!file) return alert("Photo toh select karo bhai!");

    btn.innerText = "Uploading...";
    btn.disabled = true;

    try {
        // 1. Image Storage mein upload karo
        const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        // 2. Firestore mein data save karo
        await addDoc(collection(db, "posts"), {
            userId: auth.currentUser.uid,
            username: auth.currentUser.email.split('@')[0],
            imageUrl: url,
            caption: caption,
            likes: [],
            comments: [],
            timestamp: serverTimestamp()
        });

        alert("Post Jhakkas tarike se upload ho gayi!");
        location.reload(); // Feed refresh karne ke liye
    } catch (e) {
        console.error(e);
        alert("Kuch gadbad ho gayi!");
    }
};

function loadFeed() {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    
    onSnapshot(q, (snapshot) => {
        const feedContainer = document.getElementById("feed-container");
        feedContainer.innerHTML = ""; // Purani posts hatao
        
        snapshot.forEach((doc) => {
            const post = doc.data();
            const postHTML = `
                <div class="post-card">
                    <div class="post-header"><b>${post.username}</b></div>
                    <img src="${post.imageUrl}" class="post-img">
                    <div class="post-info">
                        <p><b>${post.username}</b> ${post.caption}</p>
                    </div>
                </div>`;
            feedContainer.innerHTML += postHTML;
        });
    });
}

// Page load hote hi feed chalao
auth.onAuthStateChanged((user) => {
    if (user) { loadFeed(); }
});

