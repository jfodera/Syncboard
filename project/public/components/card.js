const Card = ({title, color}) => {
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
         }else{
            return(session['rin'])
         }
      }catch(err){   
         console.error('Session Validation error:', err);
      }
   }
   
   return (
        <div className="card" onClick={() => console.log("clicked")}>
           <ReactRouterDOM.Link to="/class">
              <div className="card-header" style={{ backgroundColor: `var(${color})` }}></div>
              <div className="card-body">
                 <h3>{title}</h3>
              </div>
           </ReactRouterDOM.Link>
        </div>
   );
};
