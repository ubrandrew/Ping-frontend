import React from "react";
import SidebarButton from "./SidebarButton";
import SidebarLogoutButton from "./SidebarLogoutButton";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo cursor-default">ping</div>
      <SidebarButton destination="/alerts" name="Alerts" />
      <SidebarButton destination="/accounts" name="Accounts" />
      <SidebarButton destination="/homepage" name="C Tab" />
      <SidebarLogoutButton />
    </div>
  );
};

export default Sidebar;
