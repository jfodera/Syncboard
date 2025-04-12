// import { auth } from "../../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
// import { getAuth, GoogleAuthProvider, signInWithRedirect, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
// import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";

// const Chat = () => {
//   const [user, setUser] = React.useState(false);

//   const googleSignIn = () => {
//     setUser(true);
//   };

//   const signOut = () => {
//     setUser(false);
//   };

//   return (
//     <nav className="nav-bar">
//       <h1>React Chat</h1>
//       {user ? (
//         <button onClick={signOut} className="sign-out" type="button">
//           Sign Out
//         </button>
//       ) : (
//         <button className="sign-in">
//           <img
//             onClick={googleSignIn}
//             src={GoogleSignin}
//             alt="sign in with google"
//             type="button"
//           />
//         </button>
//       )}
//     </nav>
//   );
// };

const Chat = () => {
  const [user, setUser] = React.useState(null);

  // Firebase Authentication provider
  const provider = new firebase.auth.GoogleAuthProvider();  // Use compat version
  
  // Listen for authentication state changes
  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);  // If a user is logged in, set the user state
      } else {
        setUser(null);  // If no user is logged in, set the user state to null
      }
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  // Google Sign-In with Firebase
  const googleSignIn = () => {
    firebase.auth().signInWithRedirect(provider);  // Trigger the Google sign-in flow using compat version
  };

  // Sign Out
  const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      console.log("User signed out");
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  return (
    <nav className="nav-bar">
      <h1>React Chat</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName || user.email}</h2>
          <button onClick={handleSignOut} className="sign-out" type="button">
            Sign Out
          </button>
        </div>
      ) : (
        <button className="sign-in" onClick={googleSignIn} type="button">
          <img src="../img/btn_google_signin_dark_pressed_web.png" alt="Sign in with Google" />
        </button>
      )}
    </nav>
  );
};

export default Chat;
