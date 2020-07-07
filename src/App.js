import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import Homepage from "./pages/Homepage";
import AlertsPage from "./pages/AlertsPage";
import AccountsPage from "./pages/AccountsPage";
import { AuthProvider } from "./auth/auth";
import ProtectedRoute from "./util/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Switch>
            <ProtectedRoute path="/alerts" exact component={AlertsPage} />
            <ProtectedRoute path="/accounts" exact component={AccountsPage} />
            <ProtectedRoute path="/homepage" exact component={Homepage} />
            <ProtectedRoute path="/alerts" exact component={AlertsPage} />

            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route
              path="*"
              component={() => {
                return "404 NOT FOUND";
              }}
            />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
