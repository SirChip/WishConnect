import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFkV0nZx5HCzEPBPdLcqu0aclTLxaaVxs",
  authDomain: "wishconnect-95318.firebaseapp.com",
  projectId: "wishconnect-95318",
  storageBucket: "wishconnect-95318.appspot.com",
  messagingSenderId: "417927480202",
  appId: "1:417927480202:web:28a57312f25e09919a7e73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Form submission
const authForm = document.getElementById('authForm');
const authMessage = document.getElementById('authMessage');
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Try to sign in
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // If successful, redirect to the dashboard
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            // If not signed in, try to create a new user
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // If successful, redirect to the dashboard
                    window.location.href = 'dashboard.html';
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
