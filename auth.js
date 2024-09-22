import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const auth = getAuth();

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
      const errorCode = error.code;
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
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login error:", errorMessage);
      alert("Login error: " + errorMessage);
    });
}

// Function to handle logout
function logout() {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("User signed out");
    alert("Logged out successfully!");
    // You can redirect the user or update UI here
  }).catch((error) => {
    // An error happened.
    console.error("Logout error:", error);
    alert("Logout error: " + error.message);
  });
}

// Export the functions so they can be used in other files
export { signUp, login, logout };
