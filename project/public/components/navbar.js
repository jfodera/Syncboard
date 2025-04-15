const Navbar = () => {

   //hooks
   const [loggedIn, setLoggedIn] = React.useState(false); 


   const handleLogOut = async () => {

      try {
         //calls our API -> note there is no URL at this point so we are fin e
         const response = await fetch('/logout', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
         });

     
         //response was in teh 200's 
         if (response.ok) {
            window.location.href = '/';
         } else {
            //if there is an issue
            alert("fetch call to logout specifications incorrect");
         }
      } catch (error) {
         console.error('Error:', error);
         alert('Something went wrong. Please try again.');
      }
  };

   //weather or not login or logout appears 
   React.useEffect( () => {
      const valSession = async ()=> {
         try{

            const rinRes = await fetch('/session/rin', {
               method: 'GET',
               credentials: 'include',
               headers: { 'Content-Type': 'application/json' },
            });
            let session = await rinRes.json()
               
            if(session['sessionMissing']){
               
               setLoggedIn(false);
            }else{
               
               setLoggedIn(true);
            }
         }catch(err){   
            console.error('Session Validation error:', err);
         }
      }
      
      valSession();
      // console.log(notLoggedIn)



   }, []);
    return (
        <nav className="navbar">
            <ReactRouterDOM.Link to="/"><div className="logo">SyncBoard</div></ReactRouterDOM.Link>
            <div className="menu">
                {/* <a href="#">Home</a> */}
                <ReactRouterDOM.Link to="/">Workspaces</ReactRouterDOM.Link>
                {/* <a href="#">Professor Tools</a> */}
            </div>
            {loggedIn &&(<div onClick={handleLogOut} className="logout" >Logout</div>)}
        </nav>
    );
};