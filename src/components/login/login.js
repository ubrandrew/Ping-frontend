import React, {useState, useEffect} from 'react';
import loginImage from './static/login.svg'
import './static/style.scss'
export function Login(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onUsernameChange = (event) => {
        //setUsername(event.)
    }
    return  (
        <div className="base-container">
            <div className="header">Login</div>
            <div className="content">
                <img src={loginImage} alt="login" className="image" />
                <div className="form">
                    <form className="form-group">
                        <label>Username</label>
                        <input value={username} type="text" name="username" placeholder="Username"/>
                        <label>Password</label>
                        <input value={password} type="password" name="password" placeholder="Password"/>
                    </form>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn">
                    Login
                </button>
            </div>
        </div>
    )
    
}