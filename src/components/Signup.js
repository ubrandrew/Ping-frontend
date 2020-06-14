import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Redirect, useHistory} from 'react-router-dom';
import loginImage from '../static/login.svg';
import './Login.scss';
import auth from '../auth/auth';


export function Signup(props){
    axios.defaults.withCredentials = true
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    const onUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const submitCredentials = (event) => {
        event.preventDefault()
        auth.signup(
            {
                //'email': email,
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
            <div className="header">Signup</div>
            <div className="content">
                <img src={loginImage} alt="login" className="image" />
                <div className="form">
                    <form onSubmitclassName="form-group" onSubmit={submitCredentials}>
                        <label>Email</label>
                        <input value={email} onChange={onEmailChange} type="email" name="email" placeholder="Email"/>
                        <label>Username</label>
                        <input value={username} onChange={onUsernameChange} type="text" name="username" placeholder="Username"/>
                        <label>Password</label>
                        <input value={password} onChange={onPasswordChange} type="password" name="password" placeholder="Password"/>
                        <button type="submit" className="btn">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
            <div className="footer">
                
            </div>
        </div>
    )
    
}