import React, { useState } from "react";

interface JoinCreateRoomProps {
  uuid: () => string;
  setRoomJoined: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const JoinCreateRoom: React.FC<JoinCreateRoomProps> = ({ uuid, setRoomJoined, setUser }) => {
  const [userName, setUserName] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = uuid();
    const roomId = roomName ? roomName : uuid();
    const newUser = {
      userId,
      userName,
      roomId,
      host: roomName ? false : true,
      presenter: roomName ? false : true,
    };
    setUser(newUser);
    setRoomJoined(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="display-5 text-center mb-4">React Drawing App</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">Name</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="roomName">Room</label>
          <input
            type="text"
            className="form-control"
            id="roomName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {roomName ? "Join Room" : "Create Room"}
        </button>
      </form>
    </div>
  );
};

export default JoinCreateRoom;
