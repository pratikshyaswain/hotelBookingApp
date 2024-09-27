import React from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";
const AdminLayout = () => {
  const { user, loading } = useAuth();
  console.log("admin", user);
  if (loading) {
    return (
      <div className="container loading">
        <img src="/assets/loading.webp" alt="" width={100} />
      </div>
    );
  }
  if (!user.isAdmin) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <>
      <header>
        <div className="container">
          <div className="admin">
            {" "}
            <h2>Admin Dashboard</h2>
          </div>

          <div className="admin-form">
            <ul>
              <li>
                <NavLink to="/admin/users">Users</NavLink>
              </li>
              <li>
                <NavLink to="/admin/hotels">Hotels</NavLink>
              </li>
              <li>
                <NavLink to="/admin/bookings">Bookings</NavLink>
              </li>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </ul>
          </div>

          {/* <div className="admin-text">
            <h2>Hii! welcome to the admin page</h2>
          </div> */}
        </div>
      </header>

      <Outlet></Outlet>
    </>
  );
};

export default AdminLayout;
