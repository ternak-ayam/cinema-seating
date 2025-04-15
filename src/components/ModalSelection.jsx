// src/components/ModalSelection.js
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import SeatSelection from "../features/seating/SeatSelection";
import SeatLegenda from "../components/SeatLegenda";
import IconCross from "../assets/cross.svg";
import IconCheck from "../assets/document-check.svg";
import imgQris from "../assets/img/qris.png";
import imgBni from "../assets/img/bni.png";
import imgMandiri from "../assets/img/mandiri.png";
import {
  setPaymentMethod,
  clearPaymentMethod,
} from "../features/payment/paymentSlice";
import { clearSeats } from "../features/seating/seatSlice";
import { setTime, clearTime } from "../features/time/timeSlice";

const paymentMethods = [
  { id: "QRIS", label: "QRIS", img: imgQris },
  { id: "BNI", label: "BNI", img: imgBni },
  { id: "MANDIRI", label: "MANDIRI", img: imgMandiri },
];

export default function ModalSelection({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.seats.selectedSeats);
  const selectedPaymentMethod = useSelector(
    (state) => state.payment.selectedPaymentMethod
  );
  const selectedTime = useSelector((state) => state.time.selectedTime);
  const seatPrice = 15000;
  const [currentStep, setCurrentStep] = useState(1);
  // 1: Time Selection, 2: Seat Selection, 3: Payment Method, 4: Confirmation

  if (!isOpen) return null;

  const totalPrice = selectedSeats.length * seatPrice;

  const handleSeatSelection = () => {
    if (!selectedTime) {
      alert("Silakan pilih waktu terlebih dahulu.");
      return;
    }
    setCurrentStep(2);
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert("Silakan pilih kursi terlebih dahulu.");
      return;
    }
    setCurrentStep(3);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleClose = () => {
    dispatch(clearSeats());
    dispatch(clearPaymentMethod());
    dispatch(clearTime());
    setCurrentStep(1);
    onClose();
  };

  const handlePaymentMethodChange = (method) => {
    dispatch(setPaymentMethod(method));
  };

  const handleProceedToPayment = () => {
    if (!selectedPaymentMethod) {
      alert("Silakan pilih metode pembayaran.");
      return;
    }
    navigate("/transaction");
  };

  const handleTimeChange = (event) => {
    dispatch(setTime(event.target.value));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="border-b border-gray/20 pb-4">
              <select
                id="time"
                value={selectedTime || ""}
                onChange={handleTimeChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Pilih waktu</option>
                <option value="10:00">10:00</option>
                <option value="12:00">12:00</option>
                <option value="14:00">14:00</option>
                <option value="16:00">16:00</option>
                <option value="18:00">18:00</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSeatSelection}
                className="flex items-center gap-2 px-3 py-2 border border-black bg-yellow rounded-md"
              >
                <img src={IconCheck} alt="" className="size-6" />
                Lanjut Pilih Kursi
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="border-b border-gray/20">
              <SeatSelection />
              <SeatLegenda />
            </div>
            <div className="flex flex-col space-y-2">
              {selectedSeats.length > 0 && (
                <div>
                  <p className="font-semibold">
                    Kursi Terpilih: {selectedSeats.join(", ")}
                  </p>
                  <p className="font-semibold">
                    Total Harga: Rp{totalPrice.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleBack}
                className="px-3 py-2 border border-black bg-gray-300 rounded-md"
              >
                Kembali
              </button>
              <button
                onClick={handleConfirm}
                className="flex items-center gap-2 px-3 py-2 border border-black bg-yellow rounded-md"
              >
                <img src={IconCheck} alt="" className="size-6" />
                Lanjut Pembayaran
              </button>
            </div>
          </>
        );
      case 3:
        return (
          <div className="flex flex-col space-y-2">
            <p className="font-semibold">
              Metode Pembayaran: {selectedPaymentMethod || "Belum dipilih"}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentMethodChange(method.id)}
                  className={`flex items-center p-2 rounded-md border border-gray/40 hover:bg-yellow/40 transition ${
                    selectedPaymentMethod === method.id
                      ? "bg-yellow/40 border-yellow"
                      : "bg-white"
                  }`}
                >
                  <img
                    src={method.img}
                    alt={method.label}
                    className="w-8 h-8 mr-2 object-contain"
                  />
                  {method.label}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center border-b border-gray/20 pb-4">
              <p className="font-semibold">Jumlah Kursi : </p>
              <p>{selectedSeats.length} seat</p>
            </div>
            <div className="flex justify-between items-center border-b border-gray/20 pb-4">
              <p className="font-semibold">Kursi Terpilih : </p>
              <p>{selectedSeats.join(", ")}</p>
            </div>
            <div className="flex justify-between items-center border-b border-gray/20 pb-4">
              <p className="font-semibold">Total Harga: </p>
              <p className="font-semibold text-red-600">
                Rp{totalPrice.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleBack}
                className="px-3 py-2 border border-black bg-gray-300 rounded-md"
              >
                Kembali
              </button>
              <button
                onClick={handleProceedToPayment}
                className="ml-2 px-3 py-2 border border-black bg-yellow rounded-md"
              >
                Konfirmasi Pesanan
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 transition-all">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] flex flex-col space-y-4">
        <div className="flex justify-between items-center border-b border-gray/20 pb-4">
          <h2 className="text-xl font-bold">
            {currentStep === 1
              ? "Pilih Waktu"
              : currentStep === 2
              ? "Pilih Kursi"
              : currentStep === 3
              ? "Pilih Metode Pembayaran"
              : "Ringkasan Pemesanan"}
          </h2>
          <button
            onClick={handleClose}
            className="flex items-center justify-center"
          >
            <img src={IconCross} alt="" className="size-6" />
          </button>
        </div>
        {renderStep()}
      </div>
    </div>
  );
}
