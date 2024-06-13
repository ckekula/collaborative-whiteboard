import React from "react"

const CreateRoomForm: React.FC = () => {
  return (
    <form className="form-w-100 mt-5">
      <div className="form-group">
        <input 
          type="text" 
          className="form-control my-2"
          placeholder="Enter display name"
        />
      </div>
      <div className="form-group border">
        <div className="input-group d-flex align-items-center gap-1 justify-content-center">
          <input 
            type="text" 
            className="form-control my-2 border-0"
            placeholder="Generate room code"
            disabled
          />
          <div className="input-group-append">
            <button className="btn btn-primary btn-sm me-1" type="button">
              Generate
            </button>
            <button className="btn btn-outline-danger btn-sm me-2">
              Copy
            </button>
          </div>
        </div>
      </div>
      <button type="submit" className="mt-4 btn btn-primary btn-block form-control">
        Generate Room
      </button>
    </form>
  )
}

export default CreateRoomForm