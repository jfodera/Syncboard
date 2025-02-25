const Navbar = () => {
    return (
        <nav className="navbar">
            <ReactRouterDOM.Link to="/"><div className="logo">SyncBoard</div></ReactRouterDOM.Link>
            <div className="menu">
                {/* <a href="#">Home</a> */}
                <ReactRouterDOM.Link to="/">Workspaces</ReactRouterDOM.Link>
                {/* <a href="#">Professor Tools</a> */}
            </div>
            <div className="logout" onClick={() => (window.location.href = '../login.html')}>Logout</div>
        </nav>
    );
};