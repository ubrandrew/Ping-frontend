import React from "react";
import firebaseClient from "../auth/firebase";
import "./SidebarButton.css";
import { withRouter } from "react-router-dom";

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
    <a className="sidebar-link" onClick={logOut}>
      Logout
    </a>
  );
};

export default SidebarLogoutButton;
