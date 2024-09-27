import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { toast } from "react-toastify";
// import { useParams } from "react-router-dom";
const Booking = () => {
  const { user } = useAuth();
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = user.email;
  // const params=useParams()
  const getAllBookings = async (email) => {
    try {
      const respponse = await axios.get(
        `http://localhost:5000/api/form/allBookings`,
        {
          params: { email },
        }
      );
      const data = respponse.data;
      console.log(data);
      setAllBookings(data);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setAllBookings([]); // Handle no bookings found
      } else {
        alert("An error occurred while fetching bookings.");
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    if (email) {
      // Check if email is defined before calling the function
      getAllBookings(email);
    }
  }, [email]);

  if (loading) {
    return (
      <div className="container loading">
        <img src="/assets/loading.webp" alt="" width={100} />
      </div>
    );
  }

  // delete booking

  const deleteBooking = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/form/delete/${id}`,
        {
          data: { email: email }, // Email is sent in the body of the DELETE request
        }
      );
      const data = response.data;
      // console.log("booking after delete", data);
      toast.success(data.message);
      setAllBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== id)
      );
    } catch (error) {
      toast.error("An error occurred!");
      console.log(error);
    }
  };
  return (
    <>
      {allBookings.length > 0 ? (
        <div className="container profile">
          <h2>All Bookings</h2>

          <div className="admin-users">
            <table>
              <thead>
                <tr>
                  <th>Hotel Name</th>
                  <th>Location</th>
                  <th>CheckInDate</th>
                  <th>CheckOutDate</th>
                  <th>Number Of Rooms</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.hotelName}</td>
                      <td>{item.location}</td>
                      <td>{item.checkInDate}</td>
                      <td>{item.checkOutDate}</td>
                      <td>{item.rooms}</td>
                      <td>{`${item.price * item.rooms}`}/-</td>
                      <td>{item.isBooked === "true" ? "Booked" : null}</td>

                      <td>
                        <button
                          type="submit"
                          onClick={() => deleteBooking(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <div className=" container error">
            <h4>No bookings found!</h4>
          </div>
        </>
      )}
    </>
  );
};

export default Booking;
