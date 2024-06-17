import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import io, { Socket } from "socket.io-client";
import ClientRoom from "./ClientRoom";
import JoinCreateRoom from "./JoinCreateRoom";
import Room from "./Room";
import Sidebar from "./Sidebar";
import "./style.css";
import { v4 as uuidv4 } from 'uuid';

const server = "http://localhost:5000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: Infinity,
  timeout: 10000,
  transports: ["websocket"],
};

const socket: Socket = io(server, connectionOptions);

interface User {
  userId: string;
  userName: string;
  roomId: string;
  host: boolean;
  presenter: boolean;
}

const App: React.FC = () => {
  const [userNo, setUserNo] = useState<number>(0);
  const [roomJoined, setRoomJoined] = useState<boolean>(false);
  const [user, setUser] = useState<User>({} as User);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (roomJoined) {
      socket.emit("user-joined", user);
    }
  }, [roomJoined]);

  return (
    <div className="home">
      <ToastContainer />
      {roomJoined ? (
        <>
          <Sidebar users={users} user={user} socket={socket} />
          {user.presenter ? (
            <Room
              userNo={userNo}
              user={user}
              socket={socket}
              setUsers={setUsers}
              setUserNo={setUserNo}
            />
          ) : (
            <ClientRoom
              userNo={userNo}
              socket={socket}
              setUsers={setUsers}
              setUserNo={setUserNo}
            />
          )}
        </>
      ) : (
        <JoinCreateRoom
          uuid={uuidv4}
          setRoomJoined={setRoomJoined}
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default App;
