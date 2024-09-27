import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const [userData, setUserData] = useState(true);
  const { user } = useAuth();
  const location = useLocation(); // To get the passed hotel data
  const navigate = useNavigate();
  const [userbooking, setUserBooking] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    checkInDate: "",
    checkOutDate: "",
    location: location.state?.location || "",
    hotelName: location.state?.hotelName || "",
    price: location.state?.price || "",
    rooms: "",
  });

  useEffect(() => {
    if (userData && user) {
      setUserBooking((prevState) => ({
        ...prevState,
        username: user.username,
        email: user.email,
        phone: user.phone,
      }));
      setUserData(false); // Prevent multiple updates
    }
  }, [user, userData]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserBooking({
      ...userbooking,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/form/booking",
        userbooking
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/booking");
      }
      //  else {
      //   toast.error("Not updated!");
      // }
      console.log(response);
    } catch (error) {
      if (error.response) {
        const data = error.response.data;
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      } else {
        console.log("Error:", error.message); // Log the actual error message
      } // Generic error message
    }
  };

  return (
    <>
      <div className="container form">
        <div className="first">
          <img src="/assets/booking2.webp" alt="Hotel" />
        </div>
        <div className="second">
          <form onSubmit={handleSubmit}>
            <h2>Booking Form</h2>
            <div className="input">
              <label>Name:</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your name here"
                required
                autoComplete="off"
                value={userbooking.username}
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
                value={userbooking.email}
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
                value={userbooking.phone}
                onChange={handleInput}
              />
            </div>

            <div className="input">
              <label>Check In Date:</label>
              <input
                type="date"
                name="checkInDate"
                id="checkInDate"
                placeholder="DD/MM/YYYY"
                required
                autoComplete="off"
                value={userbooking.checkInDate}
                onChange={(e) => {
                  const value = e.target.value;
                  setUserBooking({
                    ...userbooking,
                    checkInDate: value,
                  });
                }}
              />
            </div>
            <div className="input">
              <label>Check Out Date:</label>
              <input
                type="date"
                name="checkOutDate"
                id="checkOutDate"
                placeholder="DD/MM/YYYY"
                required
                autoComplete="off"
                value={userbooking.checkOutDate}
                onChange={(e) => {
                  const value = e.target.value;
                  setUserBooking({
                    ...userbooking,
                    checkOutDate: value,
                  });
                }}
              />
            </div>
            <div className="input">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Enter your location name here"
                required
                autoComplete="off"
                value={userbooking.location}
                onChange={handleInput}
              />
            </div>
            <div className="input">
              <label>Hotel Name:</label>
              <input
                type="text"
                name="hotelName"
                id="hotelName"
                placeholder="Enter your hotel name here"
                required
                autoComplete="off"
                value={userbooking.hotelName}
                onChange={handleInput}
              />
            </div>
            <div className="input">
              <label>Room:</label>
              <input
                type="text"
                name="rooms"
                id="room"
                placeholder="Enter your number of rooms here"
                required
                autoComplete="off"
                value={userbooking.rooms}
                onChange={(e) => {
                  const value = e.target.value;
                  setUserBooking({
                    ...userbooking,
                    rooms: value,
                  });
                }}
              />
            </div>
            <div className="input">
              <label>Price:</label>
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Enter your price here"
                required
                autoComplete="off"
                value={`${userbooking.price}/-`}
                onChange={handleInput}
              />
            </div>

            <button type="submit">Book Now</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
