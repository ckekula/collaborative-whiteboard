import { MutableRefObject } from 'react';

export interface Element {
  id: string;
  type: string;
  path: [number, number][];
  stroke: string;
}

export interface WhiteboardProps {
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;
    ctxRef: MutableRefObject<CanvasRenderingContext2D | null>;
    elements: Element[];
    setElements: React.Dispatch<React.SetStateAction<Element[]>>;
  }
