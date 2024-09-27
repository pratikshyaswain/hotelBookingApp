import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
const SearchHotel = ({ setHotelsData, setLoading }) => {
  // const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState({
    checkInDate: "",
    checkOutDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // console.log(dates);

      const response = await axios.post(
        "http://localhost:5000/api/date/hotel",
        dates
      );
      const data = response.data;
      setHotelsData(data);
      setLoading(false);
      console.log(data);

      setDates({
        checkInDate: "",
        checkOutDate: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setLoading(false);
    }
  };
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setDates({
      ...dates,
      [name]: value,
    });
  };

  return (
    <>
      <div className="container ">
        <div className="searchForm">
          <form action="">
            <label>CheckInDate:</label>
            <input
              type="date"
              name="checkInDate"
              value={dates.checkInDate}
              onChange={handleInput}
            />
            <label>CheckOutDate:</label>

            <input
              type="date"
              name="checkOutDate"
              value={dates.checkOutDate}
              onChange={handleInput}
            />

            <button type="submit" onClick={handleSubmit}>
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchHotel;
