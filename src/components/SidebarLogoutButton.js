import React from "react";
import firebaseClient from "../auth/firebase";
import "./SidebarButton.css";
import { withRouter } from "react-router-dom";
import "../assets/login-24px.svg"

const SidebarLogoutButton = (props) => {
  const logOut = () => {
    firebaseClient
      .auth()
      .signOut()
      .then(() => {
        console.log("fghdsjk");
      })
      .catch((err) => {
        console.log(err, props);
      });
  };

  return (
    <button className="sidebar-link logout focus:outline-none absolute bottom-0 flex justify-center" onClick={logOut}>
      <svg className="fill-current text-red-500 mr-3" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24">
        <g><rect fill="none" height="24" width="24" /></g>
        <g><path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" /></g>
      </svg>
      Logout
    </button>
  );
};

export default SidebarLogoutButton;
