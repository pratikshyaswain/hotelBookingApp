import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
const AdminUsers = () => {
  const { authorizationToken } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllUsersData = async () => {
      // Move inside useEffect
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: authorizationToken,
            },
          }
        );
        const data = response.data;
        setAllUsers(data);
        setLoading(false);
        // console.log("userdata", data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllUsersData();
  }, [authorizationToken]); // Include `authorizationToken` as a dependency

  // delete user

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = response.data;
      console.log("userdata after delete", data);
      toast.success(data.message);
      setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
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
  return (
    <>
      <div className="container">
        <button type="submit" className="add">
          <Link to="register"> + Add User</Link>
        </button>
      </div>
      {allUsers.length > 0 ? (
        <div className="container profile">
          <h2>User's Data</h2>

          <div className="admin-users">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Pin</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>{item.city}</td>
                      <td>{item.state}</td>
                      <td>{item.pin}</td>
                      <td>
                        <button type="submit" className="update">
                          <Link to={`${item._id}/edit`}>Update</Link>
                        </button>
                      </td>
                      <td>
                        <button
                          type="submit"
                          onClick={() => deleteUser(item._id)}
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
            <h4>No users found!</h4>
          </div>
        </>
      )}
    </>
  );
};

export default AdminUsers;
