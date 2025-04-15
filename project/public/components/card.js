const Card = ({title, color, group, groupName}) => {
   const handleClick = () => {
      const expiryDays = 7;
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + expiryDays);
      
      //save group info into cookies
      document.cookie = `groupid=${encodeURIComponent(group)}; expires=${expiryDate.toUTCString()}; path=/`;
      document.cookie = `groupname=${encodeURIComponent(groupName)}; expires=${expiryDate.toUTCString()}; path=/`;
   }

   return (
        <div className="card">
           <ReactRouterDOM.Link to="/class" onClick= {handleClick}>
              <div className="card-header" style={{ backgroundColor: `var(${color})` }}></div>
              <div className="card-body">
                 <h3>{title}</h3>
                 <p>{groupName}</p>
              </div>
           </ReactRouterDOM.Link>
        </div>
   );
};
