const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">SyncBoard</div>
            <div className="menu">
                {/* <a href="#">Home</a> */}
                <ReactRouterDOM.Link to="/home">Home</ReactRouterDOM.Link>
                {/* <a href="#">Professor Tools</a> */}
            </div>
            <div className="logout">Logout</div>
        </nav>
    );
};