import React from "react";
import { Socket } from "socket.io-client";

interface User {
  userId: string;
  userName: string;
  roomId: string;
  host: boolean;
  presenter: boolean;
}

interface SidebarProps {
  users: User[];
  user: User;
  socket: Socket;
}

const Sidebar: React.FC<SidebarProps> = ({ users, user, socket }) => {
  const handlePresenterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUser = users.find((u) => u.userId === e.target.value);
    if (selectedUser) {
      socket.emit("presenter-change", selectedUser);
    }
  };

  return (
    <div className="bg-light border-right col-md-2" id="sidebar-wrapper">
      <div className="sidebar-heading text-center">Settings</div>
      <div className="list-group list-group-flush">
        <div className="list-group-item">
          <p className="text-secondary">Presenter</p>
          <select
            className="form-control"
            value={users.find((u) => u.presenter)?.userId || ""}
            onChange={handlePresenterChange}
          >
            {users.map((u) => (
              <option key={u.userId} value={u.userId}>
                {u.userName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
