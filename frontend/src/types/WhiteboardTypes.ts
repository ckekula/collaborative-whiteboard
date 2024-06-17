import { Socket } from "socket.io-client";
import { RefObject } from "react";
export interface CanvasProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  ctx: React.MutableRefObject<CanvasRenderingContext2D | null>;
  color: string;
  setElements: React.Dispatch<React.SetStateAction<any[]>>;
  elements: any[];
  tool: string;
  socket: Socket;
}