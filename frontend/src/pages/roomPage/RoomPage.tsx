import { useState } from "react";
import "./RoomPage.css";
import Whiteboard from "../../components/whiteboard/Whiteboard";

const RoomPage = () => {

  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");

  return (
    <div className="row">
      <h1 className="text-center py-4">
        Collaborative Whiteboard 
        <span className="text-primary">[Users online: 0]</span>
      </h1>
      <div className="col-md-12 gap-3 px-5 mt-4 mb-5 d-flex align-items-center justify-content-around">
        <div className="d-flex col-md-2 justify-content-between gap-1">
          <div className="d-flex gap-1">
            <label htmlFor="pencil">Pencil</label>
            <input type="radio" 
              name="tool" 
              id="pencil"
              value="pencil"
              checked={tool === "pencil"} 
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
          <div className="d-flex gap-1">
            <label htmlFor="line">Line</label>
            <input type="radio" 
              name="tool" 
              id="line"
              value="line" 
              checked={tool === "line"}
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
          <div className="d-flex gap-1">
            <label htmlFor="rect">Rectangle</label>
            <input type="radio" 
              name="tool"
              id="rect"
              value="rect" 
              checked={tool === "rect"}
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3 mx-auto">
          <div className="d-flex align-items-center">
            <label htmlFor="color">Select color</label>
            <input className="mt-1 ms-1"
              type="color" 
              name="color" 
              id="color"
              value={color} 
              onChange={(e) => setColor(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-3 d-flex gap-2">
          <button className="btn btn-primary mt-1">Undo</button>
          <button className="btn btn-outline-primary mt-1">Redo</button>
        </div>
        <div className="col-md-3">
          <button className="btn btn-danger">Clear whiteboard</button>
        </div>
      </div>
      <div className="col-md-10 border mx-auto mt-2 mb-4 canvas-box">
        <Whiteboard/>
      </div>
    </div>

  )
}

export default RoomPage