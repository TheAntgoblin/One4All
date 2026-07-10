// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";


// Firebase setup
const firebaseConfig = {
    apiKey: "AIzaSyBEnNn3hthsR89evC_MHn6knpqm55J96uI",
    authDomain: "all4one-1ca59.firebaseapp.com",
    databaseURL: "https://all4one-1ca59-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "all4one-1ca59",
    storageBucket: "all4one-1ca59.appspot.com",
    messagingSenderId: "736453021564",
    appId: "1:736453021564:web:889e2b3eb8f752309c9ef9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const letterDiv = document.querySelector(".giant-letter");

if (letterDiv) {
    const key = letterDiv.dataset.letter;   // ← each page defines its own letter key
    const letterRef = ref(db, key);

    onValue(letterRef, snap => {
        letterDiv.textContent = snap.val(); // ← update letter from Firebase
    });
}


function checkAllSolved() {
    let allSolved = true;

    for (let i = 1; i <= 7; i++) {
        const val = document.querySelector(`.sword${i}`).style.display === "block";
        if (!val) {
            allSolved = false;
            break;
        }
    }

    const table = document.querySelector(".white");
    const letter = document.querySelector(".giant-letter");

    if (table) {
        table.style.display = allSolved ? "block" : "none";
    }

    if (letter) {
        letter.style.display = allSolved ? "block" : "none";
    }
}

for (let i = 1; i <= 7; i++) {

    const swordImg = document.querySelector(`.sword${i}`);
    const solvedRef = ref(db, `solved${i}`);

    // Hide by default
    if (swordImg) swordImg.style.display = "none";

    // Live listener
    onValue(solvedRef, snap => {
        const solved = snap.val();
        if (swordImg) {
            swordImg.style.display = solved ? "block" : "none";
        }

        checkAllSolved();
    });
}

