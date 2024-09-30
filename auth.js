import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
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

const actionCodeSettings = {
    url: 'https://wishconnect-95318.firebaseapp.com/finishSignUp', // Redirect URL after login
    handleCodeInApp: true,
};

// Passwordless Signup
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const paypalUsername = document.getElementById('paypalUsername').value;

    try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem('paypalUsername', paypalUsername); // Save PayPal username locally
        window.localStorage.setItem('emailForSignIn', email); // Save email for login verification
        alert("Sign-up link sent! Please check your email.");
    } catch (error) {
        console.error("Error sending sign-up link:", error);
        alert(error.message);
    }
});

// Passwordless Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;

    try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', email);
        alert("Login link sent! Please check your email.");
    } catch (error) {
        console.error("Error sending login link:", error);
        alert(error.message);
    }
});

// Completing the sign-in process
if (isSignInWithEmailLink(auth, window.location.href)) {
    const email = window.localStorage.getItem('emailForSignIn');
    signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {
            const paypalUsername = window.localStorage.getItem('paypalUsername');
            if (paypalUsername) {
                // Store PayPal username in Firestore
                await setDoc(doc(db, "users", result.user.uid), { paypalUsername });
            }
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        })
        .catch((error) => {
            console.error("Error during sign-in:", error);
            alert(error.message);
        });
}

// Forgot Password
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
