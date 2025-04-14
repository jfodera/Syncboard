const Workspace = () => {
    const [workspaces, setWorkspaces] = React.useState([]);

    const colors = ["--orange", "--yellow", "--blue"];
   
    //runs on mount and when dependecies in dependency array change (there are none)
    React.useEffect( async () => {

      //if doesn't exist, is undefined    
      try{

         const rinRes = await fetch('/session/rin', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
         });
         var rin = await rinRes.json()
         rin = rin['rin']

      }catch{   
         console.error('Session Validation error:', err);
      }


      //we would need to save the user's rin in a session variable, but now I will be hardcoding it
      const rin = 662098475;

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
