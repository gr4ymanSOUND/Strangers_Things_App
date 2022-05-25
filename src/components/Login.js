import React, { useState } from "react";
import { loginUser, registerUser } from "../api";

const Login = ({ setToken, history }) => {

    //set up the state for the form
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    // by default, we want to use the login functionality - there is a button that changes this variable which in turn changes which function the event handler calls
    // let register = false;
    const [register, setRegister] = useState(false);

    // test users
    // user: testAustintest
    // pass: testing

    // user: testAustinUser
    // pass: testing1

    // handles the result of the login or register API calls
    const handleLoginAttempt = (result) => {
      // if successful, set the token in state and local storage, then clear the form
      if (result.success)  {
        setToken(result.data.token);
        localStorage.setItem('jwt', result.data.token);
        setUserName('');
        setPassword('');
      } else {
        // if it failed, log the error
        alert(`${result.error.name}: ${result.error.message}`)
      } 
    }
    
    // handles the submit event, checking whether we're registering or logging in, then calling the correct API function
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('register in submit', register)
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
      <form className='login-form' onSubmit={submitHandler}>
        <h3 id='form-message'>Please Log In</h3>
        <ul id="register-requirements">
            <li>username must be at least 8 characters</li>
            <li>password must be at least 7 characters</li>
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
          <label className="form-label">Password:</label>
          <input
            type="password"
            // I set my test user's password before setting this minLength... I wanted it to be 8...
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
            console.log('register pre-click', register)
            // swap the boolean stored in register to switch which function the submit uses
            setRegister(true);
            console.log('register post-click', register)
            // remove the register button, change the form title message and the text in the button, and show the registration requirements
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