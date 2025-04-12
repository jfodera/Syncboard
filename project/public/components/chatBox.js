const ChatBox = () => {
    return (
      <main className="chat-box">
        <div className="messages-wrapper">
          <Message />
        </div>
        <SendMessage />
      </main>
    );
};