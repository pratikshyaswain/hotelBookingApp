import React from "react";
import { NavLink } from "react-router-dom";
const Error = () => {
  return (
    <>
      <div className="container error">
        <h1>Oops!</h1>
        <h2>404 Not Found</h2>
        <p>
          The page you are looking for does not exist. Please check the URL or
          return to the homepage.
        </p>

        <NavLink to="/" className="navBtn">
          <button type="submit" className="btn">
            Go Back
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default Error;
