import { db, storage, auth } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Modal open karne ka logic
document.getElementById('add-post-btn').onclick = () => {
    document.getElementById('post-modal').style.display = 'block';
};

document.getElementById('upload-btn').onclick = async () => {
    const file = document.getElementById('file-input').files[0];
    const caption = document.getElementById('caption-input').value;
    const user = auth.currentUser;

    if(!file || !user) return alert("Photo select karo bhai!");

    const btn = document.getElementById('upload-btn');
    btn.innerText = "Uploading...";
    btn.disabled = true;

    try {
        // 1. Photo Storage mein upload karo
        const storageRef = ref(storage, `posts/${Date.now()}_${user.uid}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        // 2. Post ka data Firestore mein save karo
        await addDoc(collection(db, "posts"), {
            userId: user.uid,
            imageUrl: url,
            caption: caption,
            timestamp: serverTimestamp(),
            likes: []
        });

        alert("Post Shared!");
        location.reload(); // Refresh to see new post
    } catch (e) {
        alert("Error: " + e.message);
    }
};

