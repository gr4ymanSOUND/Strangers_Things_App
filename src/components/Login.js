import React, { useState } from "react";
import { loginUser, registerUser } from "../api";

const Login = ({ setToken, history }) => {
    //form state
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    let register = false;

    // test user: testAustintest
    // pass: testing

    const handleLoginAttempt = (result) => {
      if (result.success)  {
        setToken(result.data.token);
        localStorage.setItem('jwt', result.data.token);
        // setUserName(''); decided to keep the username in state until logging out for use in a few places
        setPassword('');
        // history isn't working
        // history.push('/posts');
      } else {
        alert(`${result.error.name}: ${result.error.message}`)
      } 
    }
    
    const submitHandler = async (e) => {
        e.preventDefault();
        if (register) {
            console.log('testing register function: ', userName, password);
            let result = await registerUser(userName, password)
            handleLoginAttempt(result);
        } else {
            console.log('testing login function: ', userName, password);
            let result = await loginUser(userName, password);
            handleLoginAttempt(result);
        }
    }
  
    return (
      <form onSubmit={submitHandler}>
        <h3 id='form-message'>Please Log In</h3>
        <ul id="register-requirements">
            <li>username must be at least 8 characters</li>
            <li>password must be at least 8 characters</li>
        </ul>
        <div className="form-section">
          <label className="form-label">Username:</label>
          <input
            type="text"
            minLength={'8'}
            value={userName}
            onChange={({target: {value}}) => setUserName(value)}
            className="form-control"
            id="user"
            placeholder="Your User Name Here"
          />
        </div>
        <div className="form-section">
          <label className="form-label">Password: </label>
          <input
            type="password"
            minLength={'7'}
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
            document.getElementById('form-message').innerText = 'Create a New User';
            let regRequirements = document.getElementById('register-requirements');
            regRequirements.style.display = 'block';
            let submitButton = document.getElementById('submit-button');
            submitButton.innerText = "Register";
        }}>New? Click Here to Register</button>
        
      </form>
    );
};
  
export default Login;