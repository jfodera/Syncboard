const Footer = () => {
    return (
        <div class="footer">
            <p>Created by Morgan Myers, Grace Hui, Ryan Lee, Joseph Fodera, Aditya Borkar</p>
        </div>
    );
};

const rootElement = document.getElementById("footer");
ReactDOM.createRoot(rootElement).render(<Footer />);