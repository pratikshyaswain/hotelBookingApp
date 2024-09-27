import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/auth";
// import { toast } from "react-toastify";

const AdminBookings = () => {
  const { authorizationToken } = useAuth();
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllUsersData = async () => {
      // Move inside useEffect
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/bookings",
          {
            headers: {
              Authorization: authorizationToken,
            },
          }
        );
        const data = response.data;
        setAllBookings(data);
        setLoading(false);
        // console.log("userdata", data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllUsersData();
  }, [authorizationToken]); // Include `authorizationToken` as a dependency

  // delete user

  // const deleteUser = async (id) => {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:5000/api/admin/users/delete/${id}`,
  //       {
  //         headers: {
  //           Authorization: authorizationToken,
  //         },
  //       }
  //     );
  //     const data = response.data;
  //     console.log("userdata after delete", data);
  //     toast.success(data.message);
  //     setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  if (loading) {
    return (
      <div className="container loading">
        <img src="/assets/loading.webp" alt="" width={100} />
      </div>
    );
  }

  return (
    <>
      {allBookings.length > 0 ? (
        <div className="container profile">
          <h2>User's Bookings</h2>

          <div className="admin-users">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Hotel Name</th>
                  <th>Location</th>
                  <th>CheckInDate</th>
                  <th>CheckOutDate</th>
                  <th>Total Rooms</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.hotelName}</td>
                      <td>{item.location}</td>
                      <td>{item.checkInDate}</td>
                      <td>{item.checkOutDate}</td>
                      <td>{item.rooms}</td>
                      <td>{`${item.price * item.rooms}`}/-</td>
                      <td>{item.isBooked === "true" ? "Booked" : null}</td>
                      {/* <td>
                        <button
                          type="submit"
                          onClick={() => deleteUser(item._id)}
                        >
                          Delete
                        </button>
                      </td> */}
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

export default AdminBookings;
