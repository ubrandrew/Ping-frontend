import React from 'react';
import { Login } from './components/login/login'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="App">
            <div className="login-panel">
                <Route path="/login" exact component={Login} />
            </div>
        </div>
    </Router>
  );
}

export default App;
