const App = () => {
    return (
        <div>
            <Navbar />
            <h2>Your Workspaces</h2>
            <Workspaces />
        </div>
    );
};

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
