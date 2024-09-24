import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

// After successful login
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists() || !userDoc.data().paypalUsername) {
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
document.getElementById('signup-form').onsubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const paypalUsername = e.target.paypalUsername.value; // Get PayPal username
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
            email: email,
            paypalUsername: paypalUsername // Save PayPal username
        });
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error("Error signing up:", error);
    }
};

// Add event listener to the login form
document.getElementById('login-form').onsubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
        await auth.signInWithEmailAndPassword(email, password);
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error("Error logging in:", error);
    }
};
