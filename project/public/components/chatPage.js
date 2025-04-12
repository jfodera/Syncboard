// const ChatPage = () => {
//   const [user, setUser] = React.useState(false);

//   return (
    
//     <div className="App">
//       <Chat />
//       {!user ? (
//         <Welcome />
//       ) : (
//         <>
//           <ChatBox />
//         </>
//       )}
//     </div>
//   );
// };


const ChatPage = () => {
    const [user] = useAuthState(auth);
    return (
      <div className="App">
        <NavBar />
        {!user ? <Welcome /> : <ChatBox />}
      </div>
    );
  }