import React, { useState, useCallback } from "react";
import axios from "axios";
import loginImage from "../static/login.svg";
import "./Login.scss";
import firebaseClient from "../auth/firebase";
import { AuthContext } from "../auth/auth";

export function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitCredentials = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await firebaseClient
          .auth()
          .createUserWithEmailAndPassword(email, password);
        props.history.push("/alerts");
      } catch (error) {
        alert(error);
      }
    },
    [email, password, props.history]
  );

  return (
    <div className="base-container">
      <div className="header">Signup</div>
      <div className="content">
        <img src={loginImage} alt="login" className="image" />
        <div className="form">
          <form onSubmitclassName="form-group" onSubmit={submitCredentials}>
            <label>
              Email
              <input
                value={email}
                onChange={onEmailChange}
                type="email"
                name="email"
                placeholder="Email"
              />
            </label>
            <label>
              Password
              <input
                value={password}
                onChange={onPasswordChange}
                type="password"
                name="password"
                placeholder="Password"
              />
            </label>
            <button type="submit" className="btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}
