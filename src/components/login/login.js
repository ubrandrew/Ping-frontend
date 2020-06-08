import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Redirect, useHistory} from 'react-router-dom';
import loginImage from './static/login.svg';
import './static/style.scss';
import auth from '../../auth/auth';


export function Login(props){
    axios.defaults.withCredentials = true
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const submitCredentials = (event) => {
        event.preventDefault()
        auth.login(
            {
                'username': username,
                'password' : password
            },
            () => {
                props.history.push("/")
            }
        )

        
    }

    return  (
        <div className="base-container">
            <div className="header">Login</div>
            <div className="content">
                <img src={loginImage} alt="login" className="image" />
                <div className="form">
                    <form className="form-group">
                        <label>Username</label>
                        <input value={username} onChange={onUsernameChange} type="text" name="username" placeholder="Username"/>
                        <label>Password</label>
                        <input value={password} onChange={onPasswordChange} type="password" name="password" placeholder="Password"/>
                    </form>
                </div>
            </div>
            <div className="footer">
                <button onClick={submitCredentials} type="button" className="btn">
                    Login
                </button>
            </div>
        </div>
    )
    
}