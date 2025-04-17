// styling for later, different colors for different users on the left

function addSpace(name){
    if (name.includes("%20")){
        return name.replace(/%20/g, " ");
    }
    return name
}

const Message = ({ message }) => {
    const newName = addSpace(message.name);
    const [rin, setRin] = React.useState(null);

    React.useEffect(() => {
      const getRin = async () => {
        try {
          const rinRes = await fetch('/session/rin', {method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json' }});
          const session = await rinRes.json();
  
          if (session.sessionMissing) {
            //back to login
            window.location.href = '/';
          } else {
            setRin(session.rin);
          }
        } catch (err) {
          console.error('Session Validation error:', err);
        }
      };
  
      getRin();
    }, []);
    
    return (
      <div
        className={`chat-bubble ${String(message.rin) === String(rin) ? "right" : ""}`}>
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