import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const AdminHotels = () => {
  const { authorizationToken } = useAuth();
  const [allHotels, setAllHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllhotelsData = async () => {
      // Move inside useEffect
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/hotels",
          {
            headers: {
              Authorization: authorizationToken,
            },
          }
        );
        const data = response.data;
        setAllHotels(data);
        setLoading(false);
        // console.log("hotels", data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllhotelsData();
  }, [authorizationToken]); // Include `authorizationToken` as a dependency

  // delete user

  const deleteHotel = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/hotels/delete/${id}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = response.data;
      console.log("hotels after delete", data);
      toast.success(data.message);
      setAllHotels((prevHotels) =>
        prevHotels.filter((hotel) => hotel._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return (
      <div className="container loading">
        <img src="/assets/loading.webp" alt="" width={100} />
      </div>
    );
  }
  // if (authorizationToken) {
  //   return (
  //
  //   );
  // }
  return (
    <>
      <div className="container">
        <button type="submit" className="add">
          <Link to="hotelForm"> + Add Hotel</Link>
        </button>
      </div>
      {allHotels.length > 0 ? (
        <>
          <div className="container profile">
            <h2>Hotels Data</h2>

            <div className="admin-users">
              <table>
                <thead>
                  <tr>
                    <th>Hotel Name</th>
                    <th>Location</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Rooms Availability</th>
                    <th>CheckInDate</th>
                    <th>CheckOutDate</th>
                    <th>Image</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {allHotels.map((item, index) => {
                    const normalizedPath = item.image.replace("\\", "/");
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.location}</td>
                        <td>{item.description}</td>
                        <td>{item.price}/-</td>
                        <td>{item.availableRooms}</td>
                        <td>{item.checkIndate}</td>
                        <td>{item.checkOutDate}</td>
                        <td>
                          <img
                            src={`http://localhost:5000/${normalizedPath}`}
                            alt=""
                            width={100}
                          />
                        </td>
                        {/* <td>
                        <button type="submit" className="update">
                          <Link to={`${item._id}/edit`}>Update</Link>
                        </button>
                      </td> */}
                        <td>
                          <button
                            type="submit"
                            onClick={() => deleteHotel(item._id)}
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
        </>
      ) : (
        <>
          <div className=" container error">
            <h4>No hotels found!</h4>
          </div>
        </>
      )}
    </>
  );
};

export default AdminHotels;
