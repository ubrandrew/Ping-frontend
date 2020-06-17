import React, { useState, useContext, useCallback } from "react";
import { Redirect, useHistory } from "react-router-dom";
import loginImage from "../static/login.svg";
import "./Login.scss";
import firebaseClient from "../auth/firebase";
import { AuthContext } from "../auth/auth";

export function Login(props) {
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
        await firebaseClient.auth().signInWithEmailAndPassword(email, password);
        return <Redirect to="alerts" />;
      } catch (error) {
        alert(error);
      }
    },
    [email, password]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/alerts" />;
  }

  return (
    <div className="base-container">
      <div className="header">Login</div>
      <div className="content">
        <img src={loginImage} alt="login" className="image" />
        <div className="form">
          <form className="form-group" onSubmit={submitCredentials}>
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
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="footer">
        <button
          onClick={() => {
            props.history.push("/signup");
          }}
          type="button"
          className="btn"
        >
          Signup
        </button>
      </div>
    </div>
  );
}
