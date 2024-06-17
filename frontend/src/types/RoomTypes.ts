import { Socket } from "socket.io-client";

export interface JoinCreateRoomProps {
    uuid: () => string;
    setRoomJoined: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

export interface ClientRoomProps {
    userNo: number;
    socket: Socket;
    setUsers: React.Dispatch<React.SetStateAction<any[]>>;
    setUserNo: React.Dispatch<React.SetStateAction<number>>;
}

export interface RoomProps {
    userNo: number;
    user: any;
    socket: Socket;
    setUsers: React.Dispatch<React.SetStateAction<any[]>>;
    setUserNo: React.Dispatch<React.SetStateAction<number>>;
}