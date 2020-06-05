import React, {useState, useEffect} from 'react';
import axios from 'axios';

import loginImage from './static/login.svg'
import './static/style.scss'


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
        

        axios.post(
            `http://localhost:8000/login`, 
            { 
                'username': username, 
                "password": password,
            })
            .then(res => {
                console.log(res)
            })
    }

    const otherEndpoint = (event) => {
        event.preventDefault()
        axios.defaults.withCredentials = true

        axios.get(
            `http://localhost:8000/temp`, 
           )
            .then(res => {
                console.log(res)
            })
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

                <button onClick={otherEndpoint} type="button" className="btn">
                    Test endpoint
                </button>
            </div>
        </div>
    )
    
}