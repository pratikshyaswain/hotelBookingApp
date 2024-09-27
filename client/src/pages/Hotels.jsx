import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import SearchHotel from "./SearchHotel";

const Hotels = () => {
  const { hotel, isLoggedin, getHotels } = useAuth();
  const navigate = useNavigate();
  const [hotelsData, setHotelsData] = useState([]); // Moved state from SearchHotel to Hotels
  const [loading, setLoading] = useState(false);

  const handleBooking = (hotelData) => {
    if (isLoggedin) {
      navigate("/bookingForm", {
        state: {
          hotelName: hotelData.name,
          price: hotelData.price,
          location: hotelData.location,
        },
      });
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!hotel || hotel.length === 0) {
      getHotels(); // Fetch hotels if not already available
    }
  }, [getHotels, hotel]);

  return (
    <>
      <SearchHotel setHotelsData={setHotelsData} setLoading={setLoading} />

      {loading ? (
        <div className="container loading">
          <img src="/assets/loading.webp" alt="Loading..." width={100} />
        </div>
      ) : hotelsData.length > 0 ? (
        <div className="container hotels-parent">
          <div className="parent">
            {hotelsData.map((data, index) => {
              const normalizedPath = data.image.replace("\\", "/");
              return (
                <div key={index} className="hotels">
                  <img
                    src={`http://localhost:5000/${normalizedPath}`}
                    alt={data.name}
                    width={320}
                    height={320}
                  />
                  <div className="text">
                    <h3> {data.name}</h3>
                    <p>{data.description}</p>
                    <p>
                      <b>Price: </b>
                      {data.price}/- per day
                    </p>
                    <p>
                      <b>Location:</b> {data.location}
                    </p>
                    <p>
                      <b>Rooms availability:</b> {data.availableRooms}
                    </p>

                    <button onClick={() => handleBooking(data)}>
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="container hotels-parent">
          <div className="parent">
            {hotel.map((data, index) => {
              const normalizedPath = data.image.replace("\\", "/");

              return (
                <div key={index} className="hotels">
                  <img
                    src={`http://localhost:5000/${normalizedPath}`}
                    alt={data.name}
                    width={320}
                    height={320}
                  />
                  <div className="text">
                    <h3> {data.name}</h3>
                    <p>{data.description}</p>
                    <p>
                      <b>Price: </b>
                      {data.price}/- per day
                    </p>
                    <p>
                      <b>Location:</b> {data.location}
                    </p>
                    <p>
                      <b>Rooms availability:</b> {data.availableRooms}
                    </p>

                    <button onClick={() => handleBooking(data)}>
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Hotels;
