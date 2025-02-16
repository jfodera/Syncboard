const Card = ({ title, day, time, location, color }) => {
    return (
        <div className="card">
            <div className="card-header" style={{ backgroundColor: `var(${color})` }}></div>
            <div className="card-body">
                <h3>{title}</h3>
                <p>{day}</p>
                <p>{time}</p>
                <p>{location}</p>
            </div>
        </div>
    );
};
