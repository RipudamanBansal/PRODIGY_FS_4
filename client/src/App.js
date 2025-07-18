import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chats from "./Chats";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, SetUsername] = useState("");
  const [room, SetRoom] = useState("");
  const [showChat, SetShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      SetShowChat(true);
      socket.emit("join_room", room)
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>join a chat</h3>
          <input
            type="text"
            placeholder="Name"
            onChange={(event) => {
              SetUsername(event.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Room id"
            onChange={(event) => {
              SetRoom(event.target.value);
            }}
          ></input>
          <button onClick={joinRoom}>join a Room</button>
        </div>
      )
        : (
          <Chats socket={socket} userName={username} room={room} />
        )}
    </div>
  );
}

export default App;
