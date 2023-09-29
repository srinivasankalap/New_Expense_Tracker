import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
const [confirmPasswordError, setConfirmPasswordError] = useState("");


  const handleValidation = (event) => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (password.length < 8 || password.length > 22) {
      formIsValid = false;
      setpasswordError(
        "Password must be between 8 and 22 characters"
      );
    } else {
      setpasswordError("");
    }
  
    if (password !== confirmPassword) {
      formIsValid = false;
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  
    return formIsValid;
  };

  const registerUser = async (email, password) => {
    try {
      const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAV2q7laeKHwSLSgxV3A0cenqvN7cVNV-o", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password, returnSecureToken: true }),
      });
  
      if (response.ok) {
        console.log("Signed Up");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(email,password)
  const loginSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()){
      registerUser(email, password);
    };
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" onSubmit={loginSubmit}>
              <h2>Sign Up</h2>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <small id="confirmPasswordError" className="text-danger form-text">
                  {confirmPasswordError}
                </small>
              </div>
              
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
