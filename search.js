import { db } from "./firebase.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const resultsContainer = document.getElementById("search-results");

window.searchUsers = async () => {
    const searchText = document.getElementById("search-input").value.toLowerCase();
    
    if (searchText.length < 1) {
        resultsContainer.innerHTML = "";
        return;
    }

    const q = query(
        collection(db, "users"), 
        where("username", ">=", searchText),
        where("username", "<=", searchText + '\uf8ff')
    );

    const querySnapshot = await getDocs(q);
    resultsContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const user = doc.data();
        resultsContainer.innerHTML += `
            <div class="search-item" onclick="viewProfile('${user.uid}')">
                <img src="${user.profilePic}" class="search-img">
                <span>${user.username}</span>
            </div>
        `;
    });
};

window.viewProfile = (uid) => {
    // Kisi ki profile par jaane ke liye
    window.location.href = `profile.html?id=${uid}`;
};

