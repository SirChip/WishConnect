import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFkV0nZx5HCzEPBPdLcqu0aclTLxaaVxs",
    authDomain: "wishconnect-95318.firebaseapp.com",
    projectId: "wishconnect-95318",
    storageBucket: "wishconnect-95318",
    messagingSenderId: "417927480202",
    appId: "1:417927480202:web:28a57312f25e09919a7e73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Form submission
const authForm = document.getElementById('authForm');
const authMessage = document.getElementById('authMessage');

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const paypalUsername = document.getElementById('paypalUsername').value; // Get PayPal username

    // Try to sign in
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;

            // Redirect to dashboard if logged in
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            // If not signed in, try to create a new user
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    // Save user details including PayPal username
                    await setDoc(doc(db, "users", user.uid), { paypalUsername: paypalUsername });
                    window.location.href = 'dashboard.html'; // Redirect to dashboard
                })
                .catch((error) => {
                    // Display any error
                    authMessage.textContent = error.message;
                });
        });
});

// Password reset
document.getElementById('resetPassword').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    if (email) {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                authMessage.textContent = 'Password reset email sent.';
            })
            .catch((error) => {
                authMessage.textContent = error.message;
            });
    } else {
        authMessage.textContent = 'Please enter an email first.';
    }
});

// Navigation for logged in users
const nav = document.querySelector('nav');
onAuthStateChanged(auth, (user) => {
    if (user) {
        nav.innerHTML = `
            <a href="index.html">Home</a>
            <a href="#">How It Works</a>
            <a href="#">Success Stories</a>
            <a href="browse-wishes.html">Browse Wishes</a>
            <button id="logoutButton">Logout</button>
        `;

        // Add logout functionality
        document.getElementById('logoutButton').addEventListener('click', () => {
            signOut(auth).then(() => {
                window.location.href = "auth.html"; // Redirect to login page
            }).catch((error) => {
                console.error("Error logging out: ", error);
            });
        });
    } else {
        nav.innerHTML = `
            <a href="index.html">Home</a>
            <a href="#">How It Works</a>
            <a href="#">Success Stories</a>
            <a href="browse-wishes.html">Browse Wishes</a>
            <a href="auth.html">Sign Up/Login</a>
        `;
    }
});
