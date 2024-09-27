import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { storeTokenInLs } = useAuth();
  function handleInput(e) {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        user
      );
      const data = response.data;
      console.log(data);
      if (response.status === 200) {
        storeTokenInLs(data.token);
        toast.success("Login successful!");
        navigate("/hotels");
      }
      // console.log(response); // Access response data
    } catch (error) {
      if (error.response) {
        const data = error.response.data;
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      } else {
        console.log("Error:", error.message); // Log the actual error message
      }
    }
  };
  return (
    <>
      <div className="container form">
        <div className="first">
          <img src="/assets/login.webp" alt="Hotel" />
        </div>
        <div className="second">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="input">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email here"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
              />
            </div>
            <div className="input">
              <label>Password:</label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="Enter your password here"
                required
                autoComplete="off"
                value={user.password}
                onChange={handleInput}
              />
            </div>
            <button type="submit">Login</button>
            <div className="extra">
              <p>Don't have an account?</p>
              <NavLink to="/register" className="sign">
                Sign Up
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
