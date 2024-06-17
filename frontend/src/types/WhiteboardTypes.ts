import { MutableRefObject } from 'react';
import { User } from './FormTypes';
export interface BaseElement {
  type: string;
  path?: [number, number][];
  stroke: string;
  offsetX: number;
  offsetY: number;
  width?: number;
  height?: number;
}

export interface PencilElement extends BaseElement {
  type: "pencil";
  path: [number, number][];
}

export interface LineElement extends BaseElement {
  type: "line";
  width: number;
  height: number;
}

export interface RectElement extends BaseElement {
  type: "rect";
  width: number;
  height: number;
}

export type Element = PencilElement | LineElement | RectElement;

export interface WhiteboardProps {
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;
    ctxRef: MutableRefObject<CanvasRenderingContext2D | null>;
    elements: Element[];
    setElements: React.Dispatch<React.SetStateAction<Element[]>>;
    tool: string;
    color: any;
    user: User | null;
}
