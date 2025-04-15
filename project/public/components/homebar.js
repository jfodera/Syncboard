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
                <ReactRouterDOM.Link to="/class">Team Dashboard</ReactRouterDOM.Link>
                <a href="#">Chat</a>
                <ReactRouterDOM.Link to="/class/resources">Resources</ReactRouterDOM.Link>
                <ReactRouterDOM.Link to="/class/profile">Profile</ReactRouterDOM.Link>
            </div>
        </nav>
    );
};
