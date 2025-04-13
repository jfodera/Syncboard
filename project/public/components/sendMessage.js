function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

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
          avatar: getCookie('photoURL'),
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