//note to self, now we want the user to login with group chats that they are in
// need to read the groupid from mongodb and when the user logged in, we check the groups they are in

const SendMessage = () => {
    const [message, setMessage] = React.useState("");

    const sendMessage = async (event) => {
        event.preventDefault();
        if (message.trim() === "") {
          alert("Enter valid message");
          return;
        }

        const uid = getCookie('uid');

        await window.addDoc(window.collection(window.db, "messages"), {
          text: message,
          name: getCookie('name'),
          avatar: "../userProfile.jpeg",
          createdAt: window.serverTimestamp(),
          uid,
        });
        setMessage("");
    };
    
    return (
        <form onSubmit={(event) => sendMessage(event)} className="send-message">
          <label htmlFor="messageInput" hidden>
            Enter Message
          </label>
          <input
            id="messageInput"
            name="messageInput"
            type="text"
            className="form-input__input"
            placeholder="type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
    );

};