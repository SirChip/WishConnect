import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
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
const authMessage = document.getElementById('authMessage');

// Handle Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if the user's email is verified
        if (user.emailVerified) {
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert("Please verify your email address before logging in.");
            await auth.signOut(); // Sign the user out if the email is not verified
            window.location.href = "auth.html"; // Redirect to login
        }
    } catch (error) {
        authMessage.textContent = error.message;
    }
});

// Handle Sign-Up
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const paypalUsername = document.getElementById('paypalUsername').value; // Get PayPal username

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Send verification email
        await sendEmailVerification(user);
        alert("Verification email sent! Please check your inbox.");

        // Save user details including PayPal username
        await setDoc(doc(db, "users", user.uid), { paypalUsername: paypalUsername });
        
        // Redirect to dashboard or show a message
        window.location.href = 'dashboard.html';
    } catch (error) {
        authMessage.textContent = error.message;
    }
});

// Handle Forgot Password
document.getElementById('forgotPassword').addEventListener('click', async () => {
    const email = document.getElementById('loginEmail').value;
    if (!email) {
        alert("Please enter your email address.");
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent! Please check your inbox.");
    } catch (error) {
        console.error("Error sending reset email:", error);
        alert(error.message);
    }
});

// Switch between Login and Sign-Up forms
document.getElementById('toggleForm').addEventListener('click', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const formTitle = document.getElementById('formTitle');

    // Toggle active class between the forms
    if (loginForm.classList.contains('active')) {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        formTitle.textContent = "Sign Up";
        document.getElementById('toggleForm').textContent = "Switch to Login";
    } else {
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
        formTitle.textContent = "Login";
        document.getElementById('toggleForm').textContent = "Switch to Sign Up";
    }
});
