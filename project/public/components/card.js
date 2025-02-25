

const Card = ({ title, day, time, location, color}) => {
    return (
         <div className="card">
            <ReactRouterDOM.Link to="/home">
               <div className="card-header" style={{ backgroundColor: `var(${color})` }}></div>
               <div className="card-body">
                  
                  <h3>{title}</h3>
                  <p>{day}</p>
                  <p>{time}</p>
                  <p>{location}</p>
               </div>
            </ReactRouterDOM.Link>
         </div>
    );
};
