import React, { useEffect, useState, MouseEvent, useLayoutEffect } from "react";
import rough from "roughjs";
import { WhiteboardProps, Element } from '../../types/WhiteboardTypes';

const roughGenerator = rough.generator();

const Whiteboard: React.FC<WhiteboardProps> = ({ 
  canvasRef,
  ctxRef,
  elements,
  setElements,
  tool,
  color
}) => {

  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.height = window.innerHeight * 2;
      canvas.width = window.innerWidth * 2;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
      }
      ctxRef.current = ctx;
    }
  }, []);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color;
    }
  }, [color]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && ctxRef.current) {
      const roughCanvas = rough.canvas(canvas);
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      elements.forEach((element) => {
        if (element.type === "pencil") {
          roughCanvas.linearPath(element.path, {
              stroke: element.stroke,
              strokeWidth: 5,
              roughness: 0
          });
        } else if (element.type === "line") {
          roughCanvas.draw(
            roughGenerator.line(
              element.offsetX, 
              element.offsetY, 
              element.offsetX + element.width, 
              element.offsetY + element.height,
              { 
                stroke: element.stroke,
                strokeWidth: 5,
                roughness: 0
              }
            )
          );
        } else if (element.type === "rect" ) {
          roughCanvas.draw(
            roughGenerator.rectangle(
              element.offsetX, 
              element.offsetY, 
              element.width, 
              element.height,
              { 
                stroke: element.stroke,
                strokeWidth: 5,
                roughness: 0
              }
            )
          );
        }
      });
    } 
  }, [elements, canvasRef, ctxRef]);

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if(tool === "pencil") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
        } as Element,
      ]);
    } else if (tool === "line") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "line",
          offsetX,
          offsetY,
          height: 0,
          width: 0,
          stroke: color,
        } as Element,
      ]);
    } else if (tool === "rect") {
      setElements((prevElements) => [
       ...prevElements,
        {
          type: "rect",
          offsetX,
          offsetY,
          height: 0,
          width: 0,
          stroke: color,
        } as Element,
      ]);
    }
    setIsDrawing(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
  
    setElements((prevElements) => {
      const lastElement = prevElements[prevElements.length - 1];
      if (tool === "pencil" && lastElement && lastElement.type === "pencil") {
        const newPath: [number, number][] = [...lastElement.path, [offsetX, offsetY]];
        return prevElements.map((elem, index) => {
          if (index === prevElements.length - 1) {
            return {
              ...elem,
              path: newPath,
            };
          } else {
            return elem;
          }
        });
      } else if (tool === "line" && lastElement && lastElement.type === "line") {
        return prevElements.map((elem, index) => {
          if (index === prevElements.length - 1) {
            return {
              ...elem,
              width: offsetX - elem.offsetX,
              height: offsetY - elem.offsetY,
            };
          } else {
            return elem;
          }
        });
      } else if (tool === "rect" && lastElement && lastElement.type === "rect") {
        return prevElements.map((elem, index) => {
          if (index === prevElements.length - 1) {
            return {
             ...elem,
              width: offsetX - elem.offsetX,
              height: offsetY - elem.offsetY,
            };
          } else {
            return elem;
          }
        });
      }
      return prevElements;
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="border border-dark border-2 h-100 w-100 overflow-hidden">
      <canvas 
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default Whiteboard;
