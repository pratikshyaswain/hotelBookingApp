import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Booking from "./pages/Booking";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import HotelForm from "./pages/HotelForm";
import BookingForm from "./pages/BookingForm";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminUsers from "./pages/adminPages/AdminUsers";
import AdminBookings from "./pages/adminPages/AdminBookings";
import AdminHotels from "./pages/adminPages/AdminHotels";
import AdminUpdate from "./pages/adminPages/AdminUpdate";
import Error from "./pages/Error";
import SearchHotel from "./pages/SearchHotel";
import UserUpdate from "./pages/UserUpdate";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/bookingForm" element={<BookingForm />} />
          <Route path="/searchHotel" element={<SearchHotel />} />
          <Route path="/profile/:id/edit" element={<UserUpdate />} />

          <Route path="*" element={<Error />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="hotels" element={<AdminHotels />} />
            <Route path="hotels/hotelForm" element={<HotelForm />} />
            <Route path="users/register" element={<Register />} />
            <Route path="users/:id/edit" element={<AdminUpdate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
