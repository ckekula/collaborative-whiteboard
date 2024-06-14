import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

type UUIDGenerator = () => string;

const CreateRoomForm: React.FC<{ 
  uuid: UUIDGenerator, socket:any, setUser:any }> = ({ uuid, socket, setUser }) => {

  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true
    }

    setUser(roomData);
    navigate(`/${roomId}`);
    console.log(roomData);
    socket.emit("userJoined", roomData);
  }

  return (
    <form className="form-w-100 mt-5" onSubmit={handleCreateRoom}>
      <div className="form-group">
        <input 
          type="text" 
          className="form-control my-2"
          placeholder="Enter display name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group border">
        <div className="input-group d-flex align-items-center gap-1 justify-content-center">
          <input 
            value={roomId}
            type="text" 
            className="form-control my-2 border-0"
            placeholder="Generate room code"
            disabled
          />
          <div className="input-group-append">
            <button 
              className="btn btn-primary btn-sm me-1" 
              type="button"
              onClick={() => setRoomId(uuid())}
            >Generate</button>
            <button className="btn btn-outline-danger btn-sm me-2">Copy</button>
          </div>
        </div>
      </div>
      <button 
        type="submit" 
        className="mt-4 btn btn-primary btn-block form-control"
      >Generate Room</button>
    </form>
  )
}

export default CreateRoomForm