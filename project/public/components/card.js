const Card = ({ title, color }) => {
    return (
        <div className="card">
            <ReactRouterDOM.Link to="/class">
                <div className="card-header" style={{ backgroundColor: `var(${color})` }}></div>
                <div className="card-body">
                    <h3>{title}</h3>
                </div>
            </ReactRouterDOM.Link>
        </div>
    );
};
