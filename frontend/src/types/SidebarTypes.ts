import { User } from "./User";
import { Socket } from "socket.io-client";

export interface SidebarProps {
    users: User[];
    socket: Socket;
  }