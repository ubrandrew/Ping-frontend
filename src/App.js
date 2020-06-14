import React from 'react';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import Homepage from './pages/Homepage';
import AlertsPage from './pages/AlertsPage';
import AccountsPage from './pages/AccountsPage';

import {ProtectedRoute} from './util/ProtectedRoute';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="App">
            <Switch>
                <ProtectedRoute path="/alerts" exact component={AlertsPage} /> 
                <ProtectedRoute path="/accounts" exact component={AccountsPage} /> 
                <ProtectedRoute path="/homepage" exact component={Homepage} /> 
                <ProtectedRoute path="/alerts" exact component={AlertsPage} /> 
                
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route path="*" component={() => {return "404 NOT FOUND"}}/>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
