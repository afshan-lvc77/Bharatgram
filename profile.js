import { auth, db } from "./firebase.js";
import { collection, query, where, getDocs, doc, updateDoc, onSnapshot, arrayUnion, arrayRemove} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const userPostsContainer = document.getElementById("user-posts");

// User ka data load karo (Real-time)
function loadUserProfile(profileId) {
    const userRef = doc(db, "users", profileId);
    
    onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
            const userData = docSnap.data();
            document.getElementById("follower-count").innerText = userData.followers ? userData.followers.length : 0;
            document.getElementById("following-count").innerText = userData.following ? userData.following.length : 0;
            document.getElementById("profile-username").innerText = userData.username;
        }
    });
}

auth.onAuthStateChanged(async (user) => {
    if (user) {
        loadUserProfile(user.uid);
        // User ka username set karo
        document.getElementById("profile-username").innerText = user.email.split('@')[0];

        // Sirf is user ki posts mangwao
        const q = query(collection(db, "posts"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        
        userPostsContainer.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const postHTML = `
                <div class="grid-item">
                    <img src="${post.imageUrl}" class="grid-img">
                </div>
            `;
            userPostsContainer.innerHTML += postHTML;
        });
    } else {
        window.location.href = "signup.html";
    }
});

// Follow/Unfollow Function
window.toggleFollow = async (targetUserId) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return alert("Login please!");
    if (currentUser.uid === targetUserId) return; // Khud ko follow nahi kar sakte

    const currentUserRef = doc(db, "users", currentUser.uid);
    const targetUserRef = doc(db, "users", targetUserId);

    // Get target user data to check if already following
    const targetSnap = await getDoc(targetUserRef);
    const followers = targetSnap.data().followers || [];

    if (followers.includes(currentUser.uid)) {
        // Unfollow Logic
        await updateDoc(targetUserRef, { followers: arrayRemove(currentUser.uid) });
        await updateDoc(currentUserRef, { following: arrayRemove(targetUserId) });
        document.getElementById("follow-btn").innerText = "Follow";
    } else {
        // Follow Logic
        await updateDoc(targetUserRef, { followers: arrayUnion(currentUser.uid) });
        await updateDoc(currentUserRef, { following: arrayUnion(targetUserId) });
        document.getElementById("follow-btn").innerText = "Unfollow";
        document.getElementById("follow-btn").classList.add("unfollow-style");
    }
};

// Profile load hone ke baad ye logic chalega
const msgBtn = document.getElementById("msg-btn");

// URL se profile ki ID lo (jo humne pehle setup ki thi)
const profileId = new URLSearchParams(window.location.search).get('id');

msgBtn.onclick = () => {
    if (profileId) {
        // Chat page par bhejo ID ke saath
        window.location.href = `chat.html?id=${profileId}`;
    } else {
        alert("User ID nahi mili!");
    }
};

// Ek pro tip: Agar apni khud ki profile hai, toh message button chhupa do
auth.onAuthStateChanged(user => {
    if (user && user.uid === profileId) {
        msgBtn.style.display = "none";
    }
});

