import { react } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import BookingPage from "./pages/BookingSeat";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<BookingPage />} /> */}
        <Route path="/booking-seat" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
