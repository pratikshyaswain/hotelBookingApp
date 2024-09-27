import React, { useRef, useState } from "react";
import axios from "axios";
const HotelForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    availableRooms: "",
    description: "",
    checkIndate: "",
    checkOutDate: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("price", formData.price);
    data.append("availableRooms", formData.availableRooms);
    data.append("description", formData.description);
    data.append("checkIndate", formData.checkIndate);
    data.append("checkOutDate", formData.checkOutDate);
    if (file) {
      data.append("image", file);
    }

    try {
      setMessage("");
      const response = await axios.post(
        "http://localhost:5000/api/data/hotels",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.error(response);

      alert(response.data.message);
      setFormData({
        name: "",
        location: "",
        price: "",
        availableRooms: "",
        description: "",
        checkIndate: "",
        checkOutDate: "",
      });
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input field
      }
    } catch (error) {
      console.error(error);
      setMessage("Error uploading file.");
    }
  };

  return (
    <div className="container">
      <h1>Hotel Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Available Rooms:</label>
          <input
            type="text"
            name="availableRooms"
            value={formData.availableRooms}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Check-in Date:</label>
          <input
            type="date"
            name="checkIndate"
            value={formData.checkIndate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Check-out Date:</label>
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default HotelForm;
