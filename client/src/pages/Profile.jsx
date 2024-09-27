import React from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="container loading">
        <img src="/assets/loading.webp" alt="" width={100} />
      </div>
    );
  }
  return (
    <>
      {user ? (
        <>
          {" "}
          <div className="container profile">
            <div className="table">
              <h2>Details</h2>
              <div className="details">
                <table>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Pin code</th>
                    <th>Update</th>
                  </tr>

                  <tr>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>{user.state}</td>
                    <td>{user.city}</td>
                    <td>{user.pin}</td>
                    <td>
                      {" "}
                      <button type="submit" className="update">
                        <Link to={`${user._id}/edit`}>Update</Link>
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" container error">
            <h4>Something went wrong!</h4>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
