const Homebar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bar">
            {/* Hamburger icon only visible on mobile */}
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>

            <div className={`bar-links ${isOpen ? 'open' : ''}`}>
                <ReactRouterDOM.Link to="/node/class">Team Dashboard</ReactRouterDOM.Link>
                <ReactRouterDOM.Link to="/node/class/chat">Chat</ReactRouterDOM.Link>
                <ReactRouterDOM.Link to="/node/class/resources">Resources</ReactRouterDOM.Link>
                {/* <ReactRouterDOM.Link to="/class/profile">Profile</ReactRouterDOM.Link> */}
            </div>
        </nav>
    );
};

