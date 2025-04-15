const Auth = () => {
    const SignInWithGoogle = async () => {
      try {
        //const result = await window.signInWithPopup( window.firebaseAuth, window.firebaseProvider);
        await window.signInWithRedirect( window.firebaseAuth, window.firebaseProvider);
        // console.log(result);
        // const user = result.user;
        // console.log('Signed in user:', user);

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
