import React from "react";
import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import "./AuthenticatedPage.css";

const AuthenticatedPage = ({ children, ...rest }) => {
  return (
    <>
      <Sidebar />
      <div className="wrapper overflow-auto bg-gray-200">
        <div className="main-content h-screen">{children}</div>
      </div>
    </>
  );
};

AuthenticatedPage.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthenticatedPage;
