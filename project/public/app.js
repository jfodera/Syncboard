
const App = () => {
    return (

        // Presents page based on whats currently in URL, loads into route 
        <ReactRouterDOM.BrowserRouter>
            <Navbar />
            <div className="content">
                {/* Default route (this will be shown first when the app loads) */}

                <ReactRouterDOM.Route path="/" exact component={Login} />
                <ReactRouterDOM.Route path="/signup" exact component={Signup} />
                <ReactRouterDOM.Route path="/workspace" exact component={Workspace} />

                {/* Define the route for /class */}
                <ReactRouterDOM.Route path="/class" exact component={Dashboard} />

                {/* <ReactRouterDOM.Route path="/home/dashboard" component={Dashboard} /> */}
                <ReactRouterDOM.Route path="/class/resources" component={Resources} />
                {/* no props -> use component */}
                <ReactRouterDOM.Route path="/class/profile" component={Profile} />
            </div>
            <Footer />
        </ReactRouterDOM.BrowserRouter>
    );
};




const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
