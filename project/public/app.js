
const App = () => {
    return (
        <ReactRouterDOM.BrowserRouter>
            <Navbar />
            <div className="content">
                    {/* Default route (this will be shown first when the app loads) */}

                    <ReactRouterDOM.Route path="/" exact component={Workspaces} />
                    
                    {/* Define the route for /home */}
                    <ReactRouterDOM.Route path="/home" exact component={Home} />

                    <ReactRouterDOM.Route path="/home/dashboard" component={Dashboard} />
                    <ReactRouterDOM.Route path="/home/resources" component={Resources} />
                    <ReactRouterDOM.Route path="/home/profile" render={() => <Profile name="Emily Chen"/>} />
            </div>
            <Footer />
        </ReactRouterDOM.BrowserRouter>
    );
};

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
