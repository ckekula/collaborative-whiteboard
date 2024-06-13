import React, { useEffect, useState, MouseEvent, useLayoutEffect } from "react";
import rough from "roughjs";
import { WhiteboardProps } from '../../types/WhiteboardTypes';

const roughGenerator = rough.generator();

const Whiteboard: React.FC<WhiteboardProps> = ({ 
  canvasRef,
  ctxRef,
  elements,
  setElements
}) => {

  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctxRef.current = ctx;
    }
  }, [canvasRef, ctxRef]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const roughCanvas = rough.canvas(canvas);
      elements.forEach((element) => {
        roughCanvas.linearPath(element.path);
      });
    }
  }, [elements, canvasRef]);

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;

    setElements((prevElements) => [
      ...prevElements,
      {
        id: Date.now().toString(),
        type: "pencil",
        offsetX,
        offsetY,
        path: [[offsetX, offsetY]],
        stroke: "black",
      },
    ]);
    setIsDrawing(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const { offsetX, offsetY } = e.nativeEvent;

    setElements((prevElements) => {
      const elementsCopy = [...prevElements];
      const lastElement = elementsCopy[elementsCopy.length - 1];
      const newPath = [...lastElement.path, [offsetX, offsetY] as [number, number]];

      elementsCopy[elementsCopy.length - 1] = {
        ...lastElement,
        path: newPath,
      };

      return elementsCopy;
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (

    <canvas 
      ref={canvasRef} 
      className="border border-dark border-2 h-100 w-100"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default Whiteboard;
