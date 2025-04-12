// import {signInWithPopup} from "firebase/auth";

//import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js';
// import { auth, provider } from '../firebase';
// import { signInWithPopup } from 'firebase/auth';
// const Auth = () => {
//     const SignInWithGoogle = async () => {
//         const auth = getAuth(); // Get the Firebase Authentication instance
//         const provider = new GoogleAuthProvider(); // Google authentication provider

//         try {
//             // Sign in with Google via a popup
//             const result = await signInWithPopup(auth, provider);
//             const user = result.user; // The signed-in user
//             console.log("Signed in user:", user);
//         } catch (error) {
//             console.error("Error signing in with Google:", error);
//         }
//     };

//     return (
//         <div className="auth">
//             <button onClick={SignInWithGoogle}>Sign in with Google</button>
//         </div>
//     );
// };

// const Auth = () => {
//     const SignInWithGoogle = async () => {
//         try {
//           console.log("Starting sign-in process...");
//           //const result = await signInWithPopup(auth, provider);
//           const result = await firebase.auth().signInWithPopup(firebase.auth.GoogleAuthProvider);
//           const user = result.user; // The signed-in user
//           console.log('Signed in user:', user);
//         } catch (error) {
//           console.error('Error signing in with Google:', error);
//         }
//       };
    
//       return (
//         <div className="auth">
//           <button onClick={SignInWithGoogle}>Sign in with Google</button>
//         </div>
//       );
// };



const Auth = () => {
    const SignInWithGoogle = async () => {
      try {
        console.log("Hello" + window.firebaseAuth);
        console.log(window.signInWithPopup);
        console.log("Hello" + window.firebaseProvider);
        const result = await window.signInWithPopup( window.firebaseAuth, window.firebaseProvider);
        console.log(result);
        const user = result.user;
        console.log('Signed in user:', user);

        // Store user details in cookies (expires in 7 days)
        const expiryDays = 7;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + expiryDays);
    
        document.cookie = `uid=${user.uid}; expires=${expiryDate.toUTCString()}; path=/`;
        document.cookie = `name=${encodeURIComponent(user.displayName)}; expires=${expiryDate.toUTCString()}; path=/`;        
        document.cookie = `email=${encodeURIComponent(user.email)}; expires=${expiryDate.toUTCString()}; path=/`;
        document.cookie = `photoURL=${encodeURIComponent(user.photoURL)}; expires=${expiryDate.toUTCString()}; path=/`;
        document.cookie = `accessToken=${encodeURIComponent(user.accessToken)}; expires=${expiryDate.toUTCString()}; path=/`;
        document.cookie = `refreshToken=${encodeURIComponent(user.stsTokenManager.refreshToken)}; expires=${expiryDate.toUTCString()}; path=/`;
        
      } catch (error) {
        console.error('Error signing in with Google:', error);
      }
    };
  
    return (
      <div className="auth">
        <button onClick={SignInWithGoogle}>Sign in with Google</button>
      </div>
    );
  };