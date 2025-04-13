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