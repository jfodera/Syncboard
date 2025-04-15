//another note to self, delete the footer from the content page
const SendMessage = () => {
    const [message, setMessage] = React.useState("");

    const sendMessage = async (event) => {
        event.preventDefault();
        if (message.trim() === "") {
          alert("Enter valid message");
          return;
        }

        const uid = getCookie('uid');
        const groupid = getCookie('groupid');

        await window.addDoc(window.collection(window.doc(window.db, "groups", groupid), "messages"), {
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