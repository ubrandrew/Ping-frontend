import React from "react";
import { SidebarButton } from "./SidebarButton";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="sidebarLogo">ping</h1>
      <SidebarButton destination="/alerts" name="Alerts" />
      <SidebarButton destination="/accounts" name="Accounts" />
      <SidebarButton destination="/c" name="C Tab" />
      <SidebarButton destination="/d" name="D Tab" />
      <SidebarButton destination="/e" name="E Tab" />
    </div>
  );
};

export default Sidebar;
