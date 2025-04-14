// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
// import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase configuration
// const firebaseConfig = {

// };
  
// Initialize Firebase
//const app = initializeApp(firebaseConfig);

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// const db = getFirestore(app);

// const app = firebase.initializeApp(firebaseConfig);
// console.log(app.name);
// const auth = getAuth(app);  // Firebase Authentication
// const provider = new GoogleAuthProvider();  // Google Auth Provider
  
const App = () => {
    return (

         // Presents page based on whats currently in URL, loads into route 
        <ReactRouterDOM.BrowserRouter>
            <Navbar />
            <div className="content">
                    {/* Default route (this will be shown first when the app loads) */}

                    {/* tester */}
                    {/* <ReactRouterDOM.Route path="/" exact component={Chat} /> */}

                    {/* <ReactRouterDOM.Route path="/" exact component={Workspace} /> */}
                    <ReactRouterDOM.Route path="/" exact component={Login} />
                    <ReactRouterDOM.Route path="/signup" exact component={Signup} />
                    <ReactRouterDOM.Route path="/workspace" exact component={Workspace} />
                    
                    {/* Define the route for /class */}
                    <ReactRouterDOM.Route path="/class" exact component={Dashboard} />

                    {/* <ReactRouterDOM.Route path="/home/dashboard" component={Dashboard} /> */}
                    {/* <ReactRouterDOM.Route path="/class/chat" component={Chat} /> */}
                    <ReactRouterDOM.Route path="/class/resources" component={Resources} />
                    <ReactRouterDOM.Route path="/class/profile" render={() => <Profile name="Emily Chen"/>} />
            </div>
            <Footer />
        </ReactRouterDOM.BrowserRouter>
    );
};




const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
