import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
const Logout = () => {
  const { logoutUser } = useAuth();
  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return <Navigate to="/login"></Navigate>;
};

export default Logout;
