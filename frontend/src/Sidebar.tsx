import React, { useRef } from "react";
import { SidebarProps } from "./types/SidebarTypes";

const Sidebar: React.FC<SidebarProps> = ({ users, socket }) => {
  const sideBarRef = useRef<HTMLDivElement>(null);

  const element = sideBarRef.current;
  const openSideBar = () => {
    if (element) {
      element.style.left = "0px";
    };
  }

  const closeSideBar = () => {
    if (element) {
      element.style.left = -100 + "%";
    };
  }

  return (
    <>
      <button
        className="btn btn-dark btn-sm"
        onClick={openSideBar}
        style={{ position: "absolute", top: "5%", left: "5%" }}
      >
        Users
      </button>
      <div
        className="position-fixed pt-2 h-100 bg-dark"
        ref={sideBarRef}
        style={{
          width: "150px",
          left: "-100%",
          transition: "0.3s linear",
          zIndex: "9999",
        }}
      >
        <button
          className="btn btn-block border-0 form-control rounded-0 btn-light"
          onClick={closeSideBar}
        >
          Close
        </button>
        <div className="w-100 mt-5">
          {users.map((user, index) => (
            <p key={index} className="text-white text-center py-2">
              {user.userName}
              {user.userId === socket.id && " - (You)"}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
