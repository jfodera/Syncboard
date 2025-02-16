const App = () => {
    return (
        <div>
            <Navbar />
            <h2>Your Workspaces</h2>
            <Workspaces />
            <Footer />
        </div>
    );
};

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
