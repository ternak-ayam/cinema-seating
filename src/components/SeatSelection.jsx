import { useState } from "react";
import Seat from "./Seat";
import SeatLegenda from "./SeatLegenda";

const seats = [
  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
  ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
  ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
];

const bookedSeats = ["A3", "A4", "B5", "B6", "C7", "C8"];

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]); // Simpan lebih dari satu kursi

  const handleSeatSelect = (seat) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat) ? prevSeats.filter((s) => s !== seat) : [...prevSeats, seat]
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Pilih Kursi</h2>

      {/* Grid Kursi */}
      <div className="grid grid-cols-8 gap-4">
        {seats.flat().map((seat) => (
          <Seat
            key={seat}
            seat={seat}
            isBooked={bookedSeats.includes(seat)}
            isSelected={selectedSeats.includes(seat)}
            onSelect={handleSeatSelect}
          />
        ))}
      </div>

      {/* Legenda Kursi */}
      <SeatLegenda />

      {/* Konfirmasi Pilihan */}
      {selectedSeats.length > 0 && (
        <div className="flex justify-between w-md items-center">
          <div className="max-w-xs">
            <p className="border-b-2">Jumlah Kursi: {selectedSeats.length} </p>
            <p>Kursi yang anda pesan: {selectedSeats.join(", ")} </p>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Pesan  Kursi
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
