// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

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

// Initialize Firebase and Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to handle sign up
function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("User signed up:", user);
      alert("Sign up successful!");
      // You can redirect the user or update UI here
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error("Sign up error:", errorMessage);
      alert("Sign up error: " + errorMessage);
    });
}

// Function to handle login
function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Logged in
      const user = userCredential.user;
      console.log("User logged in:", user);
      alert("Login successful!");
      // You can redirect the user or update UI here
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error("Login error:", errorMessage);
      alert("Login error: " + errorMessage);
    });
}

// Function to handle logout
function logout() {
  signOut(auth).then(() => {
    // Sign-out successful
    console.log("User signed out");
    alert("Logged out successfully!");
  }).catch((error) => {
    console.error("Logout error:", error);
    alert("Logout error: " + error.message);
  });
}

// Export the functions
export { signUp, login, logout };
