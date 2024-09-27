import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    pin: "",
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
        "http://localhost:5000/api/auth/register",
        user
      );

      const data = response.data;

      if (response.status === 201) {
        storeTokenInLs(data.token);
        toast.success("Registration successful!");
        navigate("/hotels");
      }
    } catch (error) {
      if (error.response) {
        const data = error.response.data;
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      } else {
        console.log("Error:", error.message); // Log the actual error message
      } // Generic error message
    }

    // setUser("");
  };
  return (
    <>
      <div className="container form">
        <div className="first">
          <img src="/assets/register3.webp" alt="Hotel" />
        </div>
        <div className="second">
          <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div className="input">
              <label>Name:</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your name here"
                required
                autoComplete="off"
                value={user.username}
                onChange={handleInput}
              />
            </div>
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
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter your phone here"
                required
                autoComplete="off"
                value={user.phone}
                onChange={handleInput}
              />
            </div>
            <div className="input">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter your address here"
                required
                autoComplete="off"
                value={user.address}
                onChange={handleInput}
              />
            </div>
            <div className="input">
              <label>State:</label>
              <input
                type="text"
                name="state"
                id="state"
                placeholder="Enter your state here"
                required
                autoComplete="off"
                value={user.state}
                onChange={handleInput}
              />
            </div>
            <div className="input">
              <label>City:</label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="Enter your city here"
                required
                autoComplete="off"
                value={user.city}
                onChange={handleInput}
              />
            </div>
            <div className="input">
              <label>Pin Code:</label>
              <input
                type="text"
                name="pin"
                id="pin"
                placeholder="Enter your pin here"
                required
                autoComplete="off"
                value={user.pin}
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
            <button type="submit">Register</button>
            <div className="extra">
              <p>Already have an account?</p>
              <NavLink to="/login" className="sign">
                Sign In
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
