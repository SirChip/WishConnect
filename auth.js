import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFkV0nZx5HCzEPBPdLcqu0aclTLxaaVxs",
    authDomain: "wishconnect-95318.firebaseapp.com",
    projectId: "wishconnect-95318",
    storageBucket: "wishconnect-95318.appspot.com",
    messagingSenderId: "417927480202",
    appId: "1:417927480202:web:28a57312f25e09919a7e73",
    measurementId: "G-MJRGY2YR73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up
document.getElementById('signupButton').addEventListener('click', () => {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            alert("Account created successfully!");
            window.location.href = 'dashboard.html'; // Redirect to dashboard after successful sign up
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});

// Login
document.getElementById('loginButton').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Logged in
            const user = userCredential.user;
            alert("Login successful!");
            window.location.href = 'dashboard.html'; // Redirect to dashboard after successful login
        })
        .catch((error) => {
            alert("Login error: " + error.message);
        });
});

// Forgot Password
document.getElementById('forgotPasswordLink').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    
    if (!email) {
        alert('Please enter your email address to reset your password.');
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Password reset email sent. Please check your inbox.');
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
});
