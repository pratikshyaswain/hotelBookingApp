import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
const UserUpdate = () => {
  const [userData, setUserData] = useState(true);
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    pin: "",
  });
  const navigate = useNavigate();
  const params = useParams();
  //   const navigate = useNavigate();
  //   const { storeTokenInLs } = useAuth();
  const { user } = useAuth();

  function handleInput(e) {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  }
  //   const { authorizationToken } = useAuth();
  if (userData && user) {
    setData({
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      state: user.state,
      city: user.city,
      pin: user.pin,
    });
    setUserData("");
  }

  // udate

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      const response = await axios.patch(
        `  http://localhost:5000/api/auth/user/update/${params.id}`,
        data
        // {
        //   headers: {
        //     Authorization: authorizationToken,
        //   },
        // }
      );
      if (response.status === 200) {
        const data = response.data;
        toast.success(data.message);

        navigate("/profile");
      }
    } catch (error) {
      if (error.message) {
        toast.error(error.message);
      }
    }

    // setUser("");
  };

  return (
    <>
      <div className="container form">
        <div className="second ">
          <form onSubmit={handleSubmit}>
            <h2>Update your data</h2>
            <div className="input">
              <label>Name:</label>
              <input
                type="text"
                name="username"
                id="username"
                required
                autoComplete="off"
                value={data.username}
                onChange={handleInput}
              />
            </div>
            <div className="input">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                autoComplete="off"
                value={data.email}
                onChange={handleInput}
              />
            </div>
            <div className="input">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                id="phone"
                required
                autoComplete="off"
                value={data.phone}
                onChange={handleInput}
              />
            </div>
            <div className="input">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                id="address"
                required
                autoComplete="off"
                value={data.address}
                onChange={handleInput}
              />
            </div>
            <div className="input">
              <label>State:</label>
              <input
                type="text"
                name="state"
                id="state"
                required
                autoComplete="off"
                value={data.state}
                onChange={handleInput}
              />
            </div>
            <div className="input">
              <label>City:</label>
              <input
                type="text"
                name="city"
                id="city"
                required
                autoComplete="off"
                value={data.city}
                onChange={handleInput}
              />
            </div>
            <div className="input">
              <label>Pin Code:</label>
              <input
                type="text"
                name="pin"
                id="pin"
                required
                autoComplete="off"
                value={data.pin}
                onChange={handleInput}
              />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserUpdate;
