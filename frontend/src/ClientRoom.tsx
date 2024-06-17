import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { ClientRoomProps } from "./types/RoomTypes";

const ClientRoom: React.FC<ClientRoomProps> = ({ userNo, socket, setUsers, setUserNo }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    socket.on("message", (data) => {
      toast.info(data.message);
    });
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
    socket.on("canvasImage", (data) => {
      if (imgRef.current) {
        imgRef.current.src = data;
      }
    });
  }, [socket, setUsers, setUserNo]);

  return (
    <div className="container-fluid">
      <div className="row pb-2">
        <h1 className="display-5 pt-4 pb-3 text-center">
          React Drawing App - users online: {userNo}
        </h1>
      </div>
      <div className="row mt-5">
        <div
          className="col-md-8 overflow-hidden border border-dark px-0 mx-auto mt-3"
          style={{ height: "500px" }}
        >
          <img className="w-100 h-100" ref={imgRef} alt="Canvas" />
        </div>
      </div>
    </div>
  );
};

export default ClientRoom;
