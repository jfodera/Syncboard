const Homebar = () => {
    return (
        <nav className="bar">
            <ReactRouterDOM.Link to="/home">Dashboard</ReactRouterDOM.Link>
            <a href="#">Chat</a>
            <ReactRouterDOM.Link to="/home/resources">Resources</ReactRouterDOM.Link>
            <ReactRouterDOM.Link to="/home/profile">Profile</ReactRouterDOM.Link>
        </nav>
    );
};