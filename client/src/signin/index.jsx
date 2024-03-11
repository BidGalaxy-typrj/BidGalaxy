import React, { useState } from "react";
import b from "../assets/signupImage.png";
import { Link, useNavigate } from "react-router-dom";
import HomeNav from "../components/HomePrimaryNav";
import axios from "axios";

function Signin() {
  document.title = "BidGalaxy | Signin";

  const [values, setValues] = useState({
    username : '',
    password : '',
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSignin = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/signin/index', values)
    .then(res => {
      if (res.data.Status === "Success") {
        const role = res.data.Role;
        if (role === 'admin') {
          // Redirect to admin dashboard
          navigate('/admin/Sidebar');
        } else if (role === 'user') {
          // Redirect to user dashboard
          navigate('/user/SideBar');
        } else {
          alert("Invalid role or unexpected error occurred");
        }
      } else {
        alert(res.data.Error);
      }
    })
    .then(err => console.log(err));
  }
  return (
    <div>
      <HomeNav />
      <div className="login-container">
        <div className="image-container">
          <div className="title">
            <p className="font-cantora tracking-wide font-semibold">BidGalaxy</p>
          </div>
          <div className="image-box">
            <img src={b} alt="loginImage" />
          </div>
        </div>
        <div className="form-container">
          <form className="login-form" onSubmit={handleSignin}>
            <p className="font-cantora tracking-wide text-center text-[50px]">
              Login
            </p>
            <div className="login-form-group login-form-group-1">
              <label htmlFor="lusername" className=" font-cantora tracking-wide">
                Username
              </label>
              <input
                type="text"
                id="lusername"
                name="username"
                placeholder="Enter Username"
                onChange={e => setValues({...values, username : e.target.value})}
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="lpassword" className=" font-cantora tracking-wide">
                Password
              </label>
              <input
                type="password"
                id="lpassword"
                name="password"
                placeholder="Enter Password"
                onChange={e => setValues({...values, password : e.target.value})}
                required
              />
            </div>
            <button
              type="submit"
              className=" font-cantora font-bold tracking-[0.08rem]"
            >
              Login
            </button>
            <p className="mt-4 font-cantora tracking-wider">
              Don't have an account?
              <Link className="text-[#14cffc] ml-1" to="/signup/index">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
