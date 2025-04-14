const Workspace = () => {
   //workspaces initialized to empty array , this represents the array of courses the student is in 
    const [workspaces, setWorkspaces] = React.useState([]); 

    const colors = ["--orange", "--yellow", "--blue"];
   
    //runs on mount and when dependecies in dependency array change (there are none)
    React.useEffect( async () => {
      let rin; 

      //session valildation 
      try{
         const rinRes = await fetch('/session/rin', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
         });
         let session = await rinRes.json()
          
         if(session['sessionMissing']){
            window.location.href = '/';
         }else{
            rin = session['rin']
         }
      }catch(err){   
         console.error('Session Validation error:', err);
      }

      console.log(rin) 
      

      fetch(`/groups/${rin}`, { method: 'GET' })
      .then(response=>response.json())
      .then(data => {
         setWorkspaces(data);
      });
   }, []);

    return (
        <div id="work-Holder">
            <h2>Your Workspaces</h2>
             
            <div className="workspaces">
                {workspaces.map((course, i) => (
                    <Card key={i} title={course} color={colors[i]} />
                ))}
                
            </div>
        </div>
        
    );
};
