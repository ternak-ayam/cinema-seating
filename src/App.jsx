import { react } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import BookingPage from "./pages/BookingSeat";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking-seat" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
