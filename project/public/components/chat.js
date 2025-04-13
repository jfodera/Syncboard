function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const Chat = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const checkRedirect = async () => {
      try {
        console.log("Tester!");
        const result = await window.getRedirectResult(window.firebaseAuth);
        console.log("Result: " + result);
        if (result && result.user) {
          const user = result.user;

          const expiryDays = 7;
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + expiryDays);
      
          //save user info into cookies
          document.cookie = `uid=${encodeURIComponent(user.uid)}; expires=${expiryDate.toUTCString()}; path=/`;
          document.cookie = `name=${encodeURIComponent(user.displayName)}; expires=${expiryDate.toUTCString()}; path=/`;        
          document.cookie = `email=${encodeURIComponent(user.email)}; expires=${expiryDate.toUTCString()}; path=/`;
          document.cookie = `photoURL=${encodeURIComponent(user.photoURL)}; expires=${expiryDate.toUTCString()}; path=/`;
          document.cookie = `accessToken=${encodeURIComponent(user.accessToken)}; expires=${expiryDate.toUTCString()}; path=/`;
          document.cookie = `refreshToken=${encodeURIComponent(user.stsTokenManager.refreshToken)}; expires=${expiryDate.toUTCString()}; path=/`;
          
          setIsLoggedIn(true);
          alert("You are logged in!")
        } else {
          const uid = getCookie("uid");
          if (uid) {
            console.log("Cookie:", uid);
            setIsLoggedIn(true);
            alert("You are logged in!")
          }
        }
      } catch (error) {
        console.error("getRedirectResult error:", error);
      }
    };

    checkRedirect();
  }, []);


  return (
    <div className="App">
      {/* {isLoggedIn ? (<ChatBox />) : (<Auth onLogin={() => setIsLoggedIn(true)} />)} */}
      {isLoggedIn ? (<ChatBox />) : (<Auth />)}
    </div>
  );
};