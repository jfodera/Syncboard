const Dashboard = () => {
   //runs on mount and when dependecies in dependency array change (there are none)
   React.useEffect(  () => {
      //session valildation 
      const valSession = async ()=> {
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
            }
         }catch(err){   
            console.error('Session Validation error:', err);
         }
      }
      valSession();

   }, []);
  
   return (
    <div>
      <Homebar />
      <div className="mainContent">
      <div className="left">
        <h1>Team Calendar</h1>
        <div class="fullCal-component">
         <CalendarComponent />
        </div>
    </div>

        <div className="right">
          <h1>Tasks</h1>
          <Tasks />
        </div>
      </div>
    </div>
  );
};
