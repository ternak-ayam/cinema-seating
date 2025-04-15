import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearSeats } from "../features/seating/seatSlice";
import { clearTime } from "../features/time/timeSlice";
import { setPaymentMethod } from "../features/payment/paymentSlice";

export default function Transaction() {
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.seats.selectedSeats);
  const selectedPaymentMethod = useSelector(
    (state) => state.payment.selectedPaymentMethod
  );
  const selectedTime = useSelector((state) => state.time.selectedTime);
  const seatPrice = 15000; 
  const totalPrice = selectedSeats.length * seatPrice;
  const navigate = useNavigate();

  // State untuk menghitung waktu tersisa
  const [timeLeft, setTimeLeft] = useState(5); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          dispatch(clearTime());
          dispatch(clearSeats());
          dispatch(setPaymentMethod(null));

          navigate("/booking-seat"); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); 
  }, [navigate]);

  // Menghitung menit dan detik
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="font-bold text-2xl">Transaction</h1>
          <p>
            Selesaikan transaksi anda dalam{" "}
            <span className="mb-2">
              Waktu Tersisa: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="bg-white border border-yellow/60 rounded-lg p-6 mt-4 w-[500px]">
            <h2 className="text-xl font-bold">Detail Pemesanan</h2>
            <p>Jumlah Kursi: {selectedSeats.length} seat</p>
            <p>Kursi Terpilih: {selectedSeats.join(", ")}</p>
            <p>Total Harga: Rp{totalPrice.toLocaleString()}</p>
            <p>Waktu Tayang: {selectedTime}</p>
          </div>
          <div className="bg-white border border-yellow/60 rounded-lg p-6 w-[500px]">
            <h2 className="text-xl font-bold">Metode Pembayaran</h2>
            <p className="mt-2">{selectedPaymentMethod}</p>
          </div>
          <button className="bg-yellow text-white py-2 px-4 rounded-lg mt-4">
            Konfirmasi Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}
