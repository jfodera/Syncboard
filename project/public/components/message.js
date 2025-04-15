function addSpace(name){
    if (name.includes("%20")){
        return name.replace(/%20/g, " ");
    }
    return name
}

const Message = ({ message }) => {
    const userId = getCookie('uid');
    const newName = addSpace(message.name);
  
    return (
      <div
        className={`chat-bubble ${message.uid === userId ? "right" : ""}`}>
        <img
          className="chat-bubble__left"
          src={"../userProfile.jpeg"}
          alt="user avatar"
        />
        <div className="chat-bubble__right">
          <p className="user-name">{newName}</p>
          <p className="user-message">{message.text}</p>
        </div>
      </div>
    );
};