import React, { useState, useContext, useCallback } from "react";
import { Redirect, useHistory } from "react-router-dom";
import loginImage from "../assets/undraw_online_payments_luau.svg";
import "./Login.scss";
import firebaseClient from "../auth/firebase";
import { AuthContext } from "../auth/auth";

const Login = (props) => {
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
    <div className="h-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-lg rounded rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={submitCredentials}>
          <div className="font-bold text-5xl logo text-center mb-8">
            ping
          </div>
          <img src={loginImage} className="mb-8" alt="login" />
          <div className="mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
              Email
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
                value={email}
                onChange={onEmailChange}
                type="email"
                name="email"
                placeholder="Email"
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold " htmlFor="password">
              Password
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
                value={password}
                onChange={onPasswordChange}
                type="password"
                name="password"
                placeholder="Password"
              />
            </label>
            <a className="inline-block align-baseline font-bold text-xs text-indigo-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="btn-si text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign In
            </button>
            <span className="text-xs">
              New to ping? 
              {' '}
              <a href="/signup" className="text-blue-600">Sign up here.</a>
            </span>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
