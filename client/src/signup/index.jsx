import React, { useState } from "react";
import b from "../assets/signupImage.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HomeNav from "../components/HomePrimaryNav";

function Signup() {

  document.title = "BidGalaxy | Registration";
  const [values, setValues] = useState({
    username : '',
    email : '',
    password : '',
    cpassword : '',
  });

  const navigate = useNavigate()

  const handleRegistration = (event) => {
    event.preventDefault();
    //Checking the password and confirm password
    if (values.password !== values.cpassword) {
      alert("Password and confirm password do not match");
      return;
    }
    axios.post('http://localhost:8081/signup/index', values)
    .then(res => {
      if (res.data.Status === "Success") {
        navigate('/signup/Verification');
      } else {
        if (res.data.Error === "Username already exists") {
          alert("Username already exists");
        } else if (res.data.Error === "Email address already exists") {
            alert("Email address already exists");
        } else {
            alert("Unknown server-side error");
        }
      }
    })
    .then(err => console.log(err));
  }
  return (
    <div>
      <HomeNav />
      <div className="signup-container">
        <div className="image-container">
          <div className="title">
            <p className="main font-cantora font-semibold tracking-wide">
              BidGalaxy
            </p>
          </div>
          <div className="image-box">
            <img src={b} alt="loginimage" />
          </div>
        </div>
        <div className="form-container">
          <form className="signup-form" onSubmit={handleRegistration}>
            <div className="form-group signup-form-group">
              <p className="main font-cantora font-semibold tracking-wide">
                Signup
              </p>
              <label htmlFor="username" className="font-cantora tracking-wide">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
                onChange={e => setValues({...values, username : e.target.value})}
                required
              />
            </div>
            <div className="form-group signup-form-group">
              <label htmlFor="email" className=" font-cantora tracking-wide">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                onChange={e => setValues({...values, email : e.target.value})}
                required
              />
            </div>
            <div className="form-group signup-form-group">
              <label htmlFor="password" className=" font-cantora tracking-wide">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                onChange={e => setValues({...values, password : e.target.value})}
                required
              />
            </div>
            <div className="form-group signup-form-group">
              <label htmlFor="cpassword" className=" font-cantora tracking-wide">
                Confirm Password
              </label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                placeholder="Enter Confirm Password"
                onChange={e => setValues({...values, cpassword : e.target.value})}
                required
              />
            </div>
            <button
              type="submit"
              className="signupBtn font-cantora font-bold tracking-[0.08rem]"
            >
              Signup
            </button>
            <p className="mt-4 font-cantora tracking-wider">
              Already have an account?
              <Link className="text-[#14cffc] ml-2" to="/signin/index">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
