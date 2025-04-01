import { react } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import BookingPage from "./pages/BookingSeat";
import Home from "./pages/Home";
import Transaction from "./pages/Transaction";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking-seat" element={<BookingPage />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
