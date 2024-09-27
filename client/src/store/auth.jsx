import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [serverToken, setserverToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [hotel, setHotel] = useState([]);
  const authorizationToken = `Bearer ${serverToken}`;
  const [loading, setLoading] = useState(true);

  const storeTokenInLs = (token) => {
    setserverToken(token);
    return localStorage.setItem("token", token);
  };

  let isLoggedin = !!serverToken;
  //   logout user

  const logoutUser = () => {
    setserverToken("");
    return localStorage.removeItem("token");
  };

  // jwt authentication to get surrently userdata
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/auth/user",

          {
            headers: {
              Authorization: authorizationToken,
            },
          }
        );
        // console.log(response);
        if (response.status === 200) {
          const data = response.data;
          console.log(data.userData);
          setUser(data.userData);
          setLoading(false);
        }
      } catch (error) {
        console.log("error fetching user data");
        setLoading(false);
      }
    };
    if (serverToken) {
      fetchUserData();
    }
  }, [serverToken, authorizationToken]);

  // get all hotels
  const getHotels = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/data/hotels");

      if (response.status === 200) {
        console.log(response.data.data);
        setHotel(response.data.data);
      }
      console.log(response);
    } catch (error) {
      console.log("error fetxhing hotel data");
    }
  };
  useEffect(() => {
    getHotels();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        storeTokenInLs,
        logoutUser,
        isLoggedin,
        user,
        hotel,
        getHotels,
        authorizationToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
