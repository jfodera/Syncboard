const Card = ({ title, schedule, location, color }) => {
    return (
        <div className="card">
            <div className="card-header" style={{ backgroundColor: `var(${color})` }}></div>
            <div className="card-body">
                <h3>{title}</h3>
                <p>{schedule}</p>
                <p>{location}</p>
            </div>
        </div>
    );
};
