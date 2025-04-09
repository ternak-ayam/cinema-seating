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
import { setPaymentMethod } from "../features/payment/paymentSlice"; 
import { clearSeats } from "../features/seating/seatSlice"; 

const paymentMethods = [
  { id: "QRIS", label: "QRIS", img: imgQris },
  { id: "BNI", label: "BNI", img: imgBni },
  { id: "MANDIRI", label: "MANDIRI", img: imgMandiri },
];
export default function ModalSelection({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedSeats } = useSelector((state) => state.seats);
  const { selectedPaymentMethod } = useSelector((state) => state.payment);
  const seatPrice = 15000;
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  if (!isOpen) return null;

  const totalPrice = selectedSeats.length * seatPrice;

  const handleConfirm = () => {
    if(selectedSeats.length === 0) {
      alert("Silakan pilih kursi terlebih dahulu.");
      return;
    }
    setIsSummaryVisible(true);
  };

  const handleBack = () => {
    setIsSummaryVisible(false);
  };

  const handleClose = () => {
    dispatch(clearSeats());
    dispatch(setPaymentMethod(null));
    setIsSummaryVisible(false)
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
    navigate('/transaction');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 transition-all">
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[600px] flex flex-col space-y-4">
        <div className="flex justify-between items-center border-b border-gray/20 pb-4">
          <h2 className="text-xl font-bold">{isSummaryVisible ? "Ringkasan Pemesanan" : "Pilih Kursi"}</h2>
          <button onClick={handleClose} className="flex items-center justify-center ">
            <img src={IconCross} alt="" className="size-6" />
          </button>
        </div>

        {!isSummaryVisible ? (
          <>
            <div className="border-b border-gray/20">
              <SeatSelection />
              <SeatLegenda />
            </div>
            <div className="flex flex-col space-y-2">
              {selectedSeats.length > 0 && (
                <div>
                  <p className="font-semibold">Kursi Terpilih: {selectedSeats.join(", ")}</p>
                  <p className="font-semibold">Total Harga: Rp{totalPrice.toLocaleString()}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button onClick={handleConfirm} className="flex items-center gap-2 px-3 py-2 border border-black bg-yellow rounded-md ">
                <img src={IconCheck} alt="" className="size-6" />
                Lanjut Pembayaran
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col space-y-2">
            <p className="font-semibold">Metode Pembayaran: {selectedPaymentMethod || "Belum dipilih"}</p>
            <div className="flex flex-wrap gap-4 mt-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentMethodChange(method.id)}
                  className={`flex items-center p-2 rounded-md border border-gray/40 hover:bg-yellow/40 transition ${
                    selectedPaymentMethod === method.id ? "bg-yellow/40 border-yellow" : "bg-white"
                  }`}
                >
                  <img src={method.img} alt={method.label} className="w-8 h-8 mr-2 object-contain" />
                  {method.label}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center border-b border-gray/20 pb-4">
                <p className="font-semibold">Kursi Terpilih : </p>
                <p>{selectedSeats.join(", ")}</p>
            </div>
            <div className="flex justify-between items-center border-b border-gray/20 pb-4">
              <p className="font-semibold">Total Harga: </p>
              <p className="font-semibold text-red-600">Rp{totalPrice.toLocaleString()}</p>
            </div>
            <div className="flex justify-end">
              <button onClick={handleBack} className="px-3 py-2 border border-black bg-gray-300 rounded-md">
                Kembali
              </button>
              <button onClick={handleProceedToPayment} className="ml-2 px-3 py-2 border border-black bg-yellow rounded-md">
                Konfirmasi Pesanan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
