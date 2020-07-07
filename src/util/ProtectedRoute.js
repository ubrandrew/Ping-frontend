import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthenticatedPage from "../pages/AuthenticatedPage";
import { AuthContext } from "../auth/auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!!currentUser) {
          return (
            <AuthenticatedPage>
              <Component {...props} />
            </AuthenticatedPage>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
