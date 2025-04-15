import { useEffect, useRef } from "react";

export default function SeatTooltip({
  seat,
  rowIndex,
  seatIndex,
  onClose,
  onChangeSeat,
  onDeleteSeat,
  allSeats,
}) {
  const tooltipRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleNumberChange = (e) => {
    const value = e.target.value;
    const isDuplicate = allSeats[rowIndex].seats.some(
      (s, i) => i !== seatIndex && s.number === value
    );
    if (isDuplicate) {
      alert("Nomor kursi sudah digunakan di baris ini!");
    } else {
      onChangeSeat(rowIndex, seatIndex, { number: value });
    }
  };

  const handleStatusChange = (e) => {
    onChangeSeat(rowIndex, seatIndex, { status: e.target.value });
  };

  return (
    <div
      ref={tooltipRef}
      className="absolute z-50 bg-white border border-gray-300 rounded shadow-md p-3 text-sm text-black w-64"
    >
      <div className="mb-2">
        <label className="block font-medium mb-1">Status:</label>
        <select
          value={seat.status}
          onChange={handleStatusChange}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="available">Available</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block font-medium mb-1">Nomor Kursi:</label>
        <input
          type="text"
          value={seat.number}
          onChange={handleNumberChange}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <button
        onClick={() => onDeleteSeat(rowIndex, seatIndex)}
        className="bg-red-500 text-white px-3 py-1 rounded text-sm w-full"
      >
        Hapus Kursi
      </button>
    </div>
  );
}
