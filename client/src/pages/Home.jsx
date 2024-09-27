import React from "react";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuth } from "../store/auth";
const Home = () => {
  const { isLoggedin, user } = useAuth();
  return (
    <>
      <div className="container home">
        <div className="first">
          {isLoggedin ? <p>{`Welcome! ${user.username}`}</p> : null}

          <h2>Discover the Harmony Within You</h2>

          <p>
            Discover a brand new world that helps you find the most comfortable
            place. Indulge in moments of stillness and let your mind unwind.
            Reconnect with your inner calm, and experience the bliss of peace
            that you've been searching for.
          </p>

          <NavLink to="/hotels" className="navBtn">
            <button type="submit" className="btn">
              Get Started
            </button>
          </NavLink>
        </div>
        <div className="second">
          <div className="img-parent">
            <img src="/assets/hotel3.jpeg" alt="" width="300px" />
            <img
              src="/assets/hotel7.jpeg"
              alt=""
              width="300px"
              className="img2"
            />
          </div>
        </div>
      </div>

      <div className="secondSection">
        <div className="para">
          <h2>Advanced Features</h2>
        </div>
        <div className="parent">
          <div className="first">
            <h3>Room Inventory Management</h3>
            <p>
              Effortlessly manage your room inventory with real-time updates and
              automated allocation. Maximize occupancy by streamlining bookings,
              cancellations, and check-ins to provide an exceptional guest
              experience.
            </p>
          </div>
          <div className="first">
            <h3>Guest Profile Insights</h3>
            <p>
              Gain valuable insights into guest preferences and behaviors with
              detailed guest profiling. Use this data to offer personalized
              services, enhance guest satisfaction, and build long-lasting
              relationships.
            </p>
          </div>
          <div className="first">
            <h3>Comprehensive Reporting</h3>
            <p>
              Stay on top of your hotel's performance with comprehensive
              reporting tools. Access real-time data on revenue, occupancy
              rates, and operational costs, helping you make informed decisions
              to drive profitability.
            </p>
          </div>
        </div>
      </div>

      <div className="container section">
        <div className="body">
          <div className="title">
            <p>
              Experience the epitome of luxury and sustainability, where every
              corner reveals a new adventure. <br /> Indulge in unmatched
              comfort and eco-friendly elegance, with countless wonders waiting
              to be discovered.
            </p>
          </div>
          <NavLink to="/hotels" className="navBtn">
            <button type="submit" className="btn">
              Explore More
            </button>
          </NavLink>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Home;
