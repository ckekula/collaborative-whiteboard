import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Canvas from "./Canvas";
import { Socket } from "socket.io-client";

interface RoomProps {
  userNo: number;
  user: any;
  socket: Socket;
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
  setUserNo: React.Dispatch<React.SetStateAction<number>>;
}

const Room: React.FC<RoomProps> = ({ userNo, user, socket, setUsers, setUserNo }) => {
  const [tool, setTool] = useState<string>("pencil");
  const [color, setColor] = useState<string>("#000000");
  const [elements, setElements] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    socket.on("message", (data) => {
      toast.info(data.message);
    });
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
    socket.on("canvasImage", (data) => {
      const image = new Image();
      image.src = data;
      image.onload = () => {
        ctx.current?.drawImage(image, 0, 0);
      };
    });
  }, [socket, setUsers, setUserNo]);

  useEffect(() => {
    if (user.host) {
      socket.emit("canvas-clear");
    }
  }, [user.host, socket]);

  const clearCanvas = () => {
    if (ctx.current && canvasRef.current) {
      ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setElements([]);
      socket.emit("canvas-clear");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row pb-2">
        <h1 className="display-5 pt-4 pb-3 text-center">
          React Drawing App - users online: {userNo}
        </h1>
      </div>
      <div className="row">
        <div className="col-md-8 mx-auto text-center">
          <button
            className={`btn m-1 ${tool === "pencil" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setTool("pencil")}
          >
            Pencil
          </button>
          <button
            className={`btn m-1 ${tool === "line" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setTool("line")}
          >
            Line
          </button>
          <button
            className={`btn m-1 ${tool === "rect" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setTool("rect")}
          >
            Rectangle
          </button>
          <button className="btn btn-outline-danger m-1" onClick={clearCanvas}>
            Clear
          </button>
          <input
            type="color"
            className="btn btn-outline-dark ml-1"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>
      <div className="row mt-3">
        <Canvas
          canvasRef={canvasRef}
          ctx={ctx}
          color={color}
          setElements={setElements}
          elements={elements}
          tool={tool}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default Room;
