import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const [clicked, setClicked] = useState(true);

  function handle() {
    setClicked((prev) => !prev);
  }

  const { isLoggedin } = useAuth();
  return (
    <>
      <nav>
        <NavLink to="/" className="navName">
          StaySuite!
        </NavLink>

        <div>
          <ul id="navbar" className={clicked ? "#navbar" : "#navbar active"}>
            <li>
              <NavLink to="/" className="link ">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/hotels" className="link">
                Hotels
              </NavLink>
            </li>
            {isLoggedin ? (
              <>
                <li>
                  <NavLink to="/booking" className="link">
                    Booking
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className="link">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/logout" className="link">
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/register" className="link">
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="link">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="side" onClick={handle}>
          <i
            id="bar"
            className={clicked ? "fa-solid fa-bars" : "fa-solid fa-xmark"}
          ></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
