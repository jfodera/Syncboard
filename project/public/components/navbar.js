const Navbar = () => {

   const [loggedIn, setLoggedIn] = React.useState(false); 


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
            {loggedIn &&(<ReactRouterDOM.Link onClick={handleLogOut} className="logout" to="/">Logout</ReactRouterDOM.Link>)}
        </nav>
    );
};