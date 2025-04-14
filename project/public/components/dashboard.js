const Dashboard = () => {
   //runs on mount and when dependecies in dependency array change (there are none)
   React.useEffect( async () => {
      //session valildation 
      try{
         const rinRes = await fetch('/session/rin', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
         });
         let session = await rinRes.json()
            
         if(session['sessionMissing']){
            //back to login
            window.location.href = '/';
         }else{
            rin = session['rin']
         }
      }catch(err){   
         console.error('Session Validation error:', err);
      }

   }, []);
  
   return (
    <div>
      <Homebar />
      <div className="mainContent">
      <div className="left">
        <h2>Team Calendar</h2>
        <CalendarComponent />
    </div>

        <div className="right">
          <h2>Tasks</h2>
          <Tasks />
        </div>
      </div>
    </div>
  );
};
