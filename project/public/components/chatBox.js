//note to self, now we want the user to login with group chats that they are in
// need to read the groupid from mongodb and when the user logged in, we check the groups they are in

//when the user is logged in, we should save the group ids that the user is in
//can not add another field or another document to a collection in mongodb TT
// would like to add groupname in the groups collection

const ChatBoxUpdated = () => {
    const [groups, setGroups] = React.useState([]);
    const [selectedGroupId, setSelectedGroupId] = React.useState(null);


    React.useEffect(() => {
        const uid = getCookie("uid");
        if (!uid){
            return;
        }
        const groupnumber = getCookie("groupid");
        //this should be an array

        //may need to create an endpoint to get the groups that the user is in?
        //json should hold the group id, course name, and group name
        setGroups(groupnumber);

    }, []);

    return (
        <div className="group-list">
          <h2>Your Group Chats</h2>
          {groups.length === 0 ? (
            <p>No groups found.</p>
          ) : (
            groups.map((group) => (
              <button key={group._id} onClick={() => setSelectedGroupId(group._id)}>
                {group.name}
              </button>
            ))
          )}
      
          {selectedGroupId && <ChatBox groupId={selectedGroupId} />}
        </div>
    );
};


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

// function getCookie(cname) {
//     let name = cname + "=";
//     let ca = document.cookie.split(';');
//     for(let i = 0; i < ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return decodeURIComponent(c.substring(name.length, c.length));
//       }
//     }
//     return "";
// }

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
