import React from 'react';
import { Login } from './components/login/login'
import Homepage from './components/homepage/homepage'
import {ProtectedRoute} from './components/protectedRoute'
import auth from  './auth/auth'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="App">
            <Switch>
                <ProtectedRoute path="/" exact component={Homepage} />
                <Route path="/login" exact component={Login} />
                <Route path="*" component={() => {return "404 NOT FOUND"}}/>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
