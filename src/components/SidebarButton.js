import React from "react";
import { NavLink } from "react-router-dom";
import "./SidebarButton.css";

const SidebarButton = ({name, destination}) => {

  let icon;
  if( name === "Alerts" ){
    icon = <svg className="w-5 h-5 fill-current text-gray-600 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 8v7h8V8a4 4 0 1 0-8 0zm2.03-5.67a2 2 0 1 1 3.95 0A6 6 0 0 1 16 8v6l3 2v1H1v-1l3-2V8a6 6 0 0 1 4.03-5.67zM12 18a2 2 0 1 1-4 0h4z" /></svg>
  } else if (name === "Accounts"){
    icon = <svg className="w-5 h-5 fill-current text-gray-600 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M18 6V4H2v2h16zm0 4H2v6h16v-6zM0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm4 8h4v2H4v-2z" /></svg>
  } else {
    icon = null
  }

  return (
    <div>
      <NavLink
        className="sidebar-link flex justify-center items-center"
        to={destination}
        activeStyle={{
          fontWeight: "600",
          color: "#6666FF",
          borderRight: "4px solid #8383f3"
        }}
      >
        {icon}
        {name}
      </NavLink>
    </div>
  );
};

export default SidebarButton;
