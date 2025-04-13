
const ChatBox = () => {
    const [messages, setMessages] = React.useState([]);
    const scroll = React.useRef();

    React.useEffect(() => {
        console.log("ChatBox"); 

        const q = window.query(
          window.collection(window.db, "messages"),
          window.orderBy("createdAt", "desc")
        );
        const unsubscribe = window.onSnapshot(q, (QuerySnapshot) => {
          const fetchedMessages = [];
          QuerySnapshot.forEach((doc) => {
            fetchedMessages.push({ ...doc.data(), id: doc.id });
          });
          const sortedMessages = fetchedMessages.sort(
            (a, b) => a.createdAt - b.createdAt
          );

          console.log("Messages:", sortedMessages); 

          setMessages(sortedMessages);
        });
        return () => unsubscribe;
    }, []);

    return (
        <main className="chat-box">
            <div className="messages-wrapper">
            {messages.length === 0 ? (
                <p>No messages yet</p>
            ) :
                (messages.map((message) => (
                <Message key={message.id} message={message} />
                )))}
            </div>

            <span ref={scroll}></span>
            <SendMessage scroll={scroll} />
        </main>
    );
};

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return decodeURIComponent(c.substring(name.length, c.length));
      }
    }
    return "";
}

function loadMessages() {
    const userId = getCookie('uid');
    if (!userId) {
        console.log('No user ID found in cookies.');
        return;
    }

    useEffect(() => {
        const q = window.query(window.collection(window.db, "messages"), window.where('userId', '==', userId));
      
        
        
      
    }, []);

   
}

// https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/
// https://www.w3schools.com/js/js_cookies.asp
