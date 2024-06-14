import { useState } from "react";
import { useNavigate } from "react-router-dom";

type UUIDGenerator = () => string;

const JoinRoomForm: React.FC<{ 
  uuid: UUIDGenerator, socket:any, setUser:any }> = ({ uuid, socket, setUser }) => {
  
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate(); 

  const handleJoinRoom = (e:any) => {
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
    <form className="form-w-100 mt-5">
      <div className="form-group">
        <input 
          type="text" 
          className="form-control my-2"
          placeholder="Enter display name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input 
          type="text" 
          className="form-control my-2"
          placeholder="Enter room code"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
      <button 
        type="submit" 
        className="mt-4 btn btn-primary btn-block form-control"
        onClick={handleJoinRoom}
      >Join Room</button>
    </form>  
  )
}

export default JoinRoomForm