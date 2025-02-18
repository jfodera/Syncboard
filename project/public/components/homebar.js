const Homebar = () => {
    return (
        <nav className="bar">
            <ReactRouterDOM.Link to="/home/dashboard">Dashboard</ReactRouterDOM.Link>
            <a href="#">Chat</a>
            <ReactRouterDOM.Link to="/home/resources">Resources</ReactRouterDOM.Link>
        </nav>
    );
};