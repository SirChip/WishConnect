import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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
const db = getFirestore(app);

// Form submissions
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const authMessage = document.getElementById('authMessage');

// Handle Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            authMessage.textContent = error.message;
        });
});

// Handle Sign-Up
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const paypalUsername = document.getElementById('paypalUsername').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            // Save user details including PayPal username
            await setDoc(doc(db, "users", user.uid), { paypalUsername: paypalUsername });
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            authMessage.textContent = error.message;
        });
});

// Handle Forgot Password
forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value;

    sendPasswordResetEmail(auth, email)
        .then(() => {
            authMessage.textContent = "Password reset email sent. Please check your inbox.";
        })
        .catch((error) => {
            authMessage.textContent = error.message;
        });
});

// Switch between Login and Sign-Up forms
document.getElementById('toggleForm').addEventListener('click', () => {
    loginForm.classList.toggle('active');
    signupForm.classList.toggle('active');
    forgotPasswordForm.classList.remove('active');
    const formTitle = document.getElementById('formTitle');
    formTitle.textContent = loginForm.classList.contains('active') ? "Login" : "Sign Up";
});

// Show Forgot Password form
document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('active');
    signupForm.classList.remove('active');
    forgotPasswordForm.classList.add('active');
    document.getElementById('formTitle').textContent = "Reset Password";
});
