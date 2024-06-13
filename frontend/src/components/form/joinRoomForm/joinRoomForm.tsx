const JoinRoomForm: React.FC = () => {
  return (
    <form className="form-w-100 mt-5">
      <div className="form-group">
        <input 
          type="text" 
          className="form-control my-2"
          placeholder="Enter display name"
        />
      </div>
      <div className="form-group">
        <input 
          type="text" 
          className="form-control my-2"
          placeholder="Enter room code"
        />
      </div>
      <button type="submit" className="mt-4 btn btn-primary btn-block form-control">
        Join Room
      </button>
    </form>  
  )
}

export default JoinRoomForm