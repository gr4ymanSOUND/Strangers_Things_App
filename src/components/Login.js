import React, { useState } from "react";
import { loginUser, registerUser } from "../api";

const Login = ({ setToken }) => {
    //form state
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    let register = false;

    const submitHandler = async (e) => {
        e.preventDefault();
        if (register) {
            console.log('testing register function: ', userName, password);
            // let result = loginUser(userName, password)
            // setToken(result.data.token);
            // maybe also set userName and password back to empty strings so they're not just hanging around in state?
        } else {
            console.log('testing login function: ', userName, password);
            // let result = registerUser(userName, password)
            // setToken(result.data.token);
        }
    }
  
    return (
      <form onSubmit={submitHandler}>
        <div id="register-requirements" style={{display: 'none'}}>
            <h3>Create a New User</h3>
            <p>username must be only letters</p>
            <p>password must be at least 8 characters</p>
        </div>
        <div className="form-section">
          <label className="form-label">
            Username:
          </label>
          <input
            type="text"
            value={userName}
            onChange={({target: {value}}) => setUserName(value)}
            className="form-control"
            id="user"
            placeholder="Your User Name Here"
          />
        </div>
        <div className="form-section">
          <label className="form-label">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={({target: {value}}) => setPassword(value)}
            className="form-control"
            id="pass"
            placeholder="********"
          />
        </div>
        <button id='submit-button' type='submit'>Login</button>
        <button id="register-switch" type='button' onClick={() => {
            register = !register;
            document.getElementById('register-switch').style.display = 'none';
            let regRequirements = document.getElementById('register-requirements');
            regRequirements.style.display = 'block';
            let submitButton = document.getElementById('submit-button');
            submitButton.innerText = "Register";
        }}>Register New User</button>
        
      </form>
    );
};
  
export default Login;