import "./Form.css"
import CreateRoomForm from "./createRoomForm/CreateRoomForm"
import JoinRoomForm from "./joinRoomForm/JoinRoomForm"
const Form = () => {
  return (
    <div className="row h-100 pt-5">
      <div className="col-md-4 mt-5 mx-auto p-3 form-box border border-primary rounded-2 d-flex flex-column align-items-center">
        <h1 className="text-primary fm-bold">Create Room</h1>
        <CreateRoomForm/>
      </div>
      <div className="col-md-4 mt-5 mx-auto p-3 form-box border border-primary rounded-2 d-flex flex-column align-items-center">
        <h1 className="text-primary fm-bold">Join Room</h1>
        <JoinRoomForm/>
      </div>    
    </div>
  )
}

export default Form