   const Card = ({title, color, crn}) => {
      const getRin = async ()=> {
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
   
      const setGroupSesh = async() =>{
         const rin = await getRin()
   
   
         //get list of groupID's user is in 
         const res = await fetch(`/groups/fromrin/${rin}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
         });
         let groups = await res.json()
   
         for(const group of groups){
            if(group.crn == crn){
               //set sesion id to the id of this group
               //only changes page until groupID is set, 
               const response = await fetch('/session/groupID', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({groupid: group.groupid})
               });
            }
         }
         


         //get id we just set
         const groupIDres = await fetch('/session/groupID', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
         });

         let groupIDBack = await groupIDres.json()
         let group = groupIDBack.groupid

         //get group name 
         const groupNameRes  = await fetch('/groups/:groupid', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
         });

         let groupOBJ = await groupNameRes.json()
         let groupName = groupOBJ.groupName
         
         //set cookies 
         const expiryDays = 7;
         const expiryDate = new Date();
         expiryDate.setDate(expiryDate.getDate() + expiryDays);
         
         //save group info into cookies
         document.cookie = `groupid=${encodeURIComponent(group)}; expires=${expiryDate.toUTCString()}; path=/`;
         document.cookie = `groupname=${encodeURIComponent(groupName)}; expires=${expiryDate.toUTCString()}; path=/`;

         window.location.href = '/class'; //only after everything is done do we go to the next page 
      } 

         
      
   return (
        <div className="card" onClick={async () => {await setGroupSesh();}}>
              <div className="card-header" style={{ backgroundColor: `var(${color})` }}></div>
              <div className="card-body">
                 <h3>{title}</h3>
              </div>
        </div>
    );
};
