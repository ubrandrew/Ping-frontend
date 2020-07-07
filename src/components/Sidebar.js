import React from "react";
import { SidebarButton } from "./SidebarButton";
import SidebarLogoutButton from "./SidebarLogoutButton";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">ping</div>
      <SidebarButton destination="/alerts" name="Alerts" />
      <SidebarButton destination="/accounts" name="Accounts" />
      <SidebarButton destination="/homepage" name="C Tab" />
      <SidebarButton destination="/d" name="D Tab" />
      <SidebarButton destination="/e" name="E Tab" />
      <SidebarLogoutButton />
    </div>
  );
};

export default Sidebar;
