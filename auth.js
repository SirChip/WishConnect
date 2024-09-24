// Import the Firebase SDK
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
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
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

// After successful login
auth.onAuthStateChanged(async (user) => {
  if (user) {
    const userDoc = await db.doc(`users/${user.uid}`).get();
    if (!userDoc.exists || !userDoc.data().paypalUsername) {
      // Redirect to PayPal setup page if username is not set
      window.location.href = 'setup-paypal.html';
    } else {
      // Update UI for logged-in user
      document.getElementById('nav-signup-login').innerHTML = `<a href="#" id="logout">Log Out</a>`;
      document.getElementById('logout').onclick = logoutUser;
    }
  }
});

// Function to log out the user
function logoutUser() {
  auth.signOut().then(() => {
    window.location.href = 'index.html';
  });
}

// Add event listener to the signup form
document.getElementById('signup-button').addEventListener('click', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const paypalUsername = document.getElementById('paypal').value; // Get PayPal username
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    await db.doc(`users/${userCredential.user.uid}`).set({
      email: email,
      paypalUsername: paypalUsername // Save PayPal username
    });
    window.location.href = 'dashboard.html';
  } catch (error) {
    console.error("Error signing up:", error);
  }
});

// Add event listener to the login form
document.getElementById('login-button').addEventListener('click', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.location.href = 'dashboard.html';
  } catch (error) {
    console.error("Error logging in:", error);
  }
});
