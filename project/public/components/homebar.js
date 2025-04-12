const Homebar = () => {
    return (
        <nav className="bar">
            <ReactRouterDOM.Link to="/class">Dashboard</ReactRouterDOM.Link>
            <ReactRouterDOM.Link to="/class/chat">Chat</ReactRouterDOM.Link>
            <ReactRouterDOM.Link to="/class/resources">Resources</ReactRouterDOM.Link>
            <ReactRouterDOM.Link to="/class/profile">Profile</ReactRouterDOM.Link>
        </nav>
    );
};