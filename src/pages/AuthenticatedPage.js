import React from "react";
import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import "./AuthenticatedPage.css";

const AuthenticatedPage = ({ children, ...rest }) => {
  return (
    <>
      <Sidebar />
      <div className="wrapper">
        <div className="main-content">{children}</div>
      </div>
    </>
  );
};

AuthenticatedPage.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthenticatedPage;
