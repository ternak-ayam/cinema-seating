import React, { useState } from 'react';

const SeatRow = ({
  rowIndex,
  row,
  onToggleSeatStatus,
  onMoveRow,
  onDeleteRow,
  onAddSeat,
  onEditLabel,
  onEditSeatNumber,
  onDeleteSeat,
  selectedSeat,
  setSelectedSeat
}) => {
  const [editNumber, setEditNumber] = useState('');

  const handleSeatClick = (seatIndex) => {
    const seatKey = `${rowIndex}-${seatIndex}`;
    if (selectedSeat === seatKey) {
      setSelectedSeat(null);
    } else {
      setSelectedSeat(seatKey);
      setEditNumber(row.seats[seatIndex].number);
    }
  };

  return (
    <div className="flex items-center space-x-2 mb-2 relative">
      <div className="flex items-center space-x-1">
        <button onClick={() => onDeleteRow(rowIndex)} className="p-1 bg-red-200 rounded">🗑️</button>
        <button onClick={() => onMoveRow(rowIndex, -1)} className="p-1 bg-blue-200 rounded">⬆️</button>
        <button onClick={() => onMoveRow(rowIndex, 1)} className="p-1 bg-blue-200 rounded">⬇️</button>
        <input
          value={row.rowLabel}
          onChange={(e) => onEditLabel(rowIndex, e.target.value)}
          className="w-8 text-center border rounded"
        />
      </div>
      <div className="flex flex-wrap gap-1 relative">
        {row.seats.map((seat, seatIndex) => {
          const seatKey = `${rowIndex}-${seatIndex}`;
          return (
            <div key={seatIndex} className="relative">
              <button
                onClick={() => handleSeatClick(seatIndex)}
                className={`w-8 h-8 border rounded ${seat.status === 'blocked' ? 'bg-gray-400' : 'bg-white'}`}
              >
                {seat.number}
              </button>
              {selectedSeat === seatKey && (
                <div className="absolute z-10 top-10 left-0 bg-white border rounded shadow p-2 w-40">
                  <div className="mb-2">
                    <label className="block text-sm font-medium">Status:</label>
                    <select
                      value={seat.status}
                      onChange={(e) => onToggleSeatStatus(rowIndex, seatIndex, e.target.value)}
                      className="w-full border rounded px-1 py-0.5 text-sm"
                    >
                      <option value="available">Available</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium">Nomor:</label>
                    <input
                      value={editNumber}
                      onChange={(e) => setEditNumber(e.target.value)}
                      onBlur={() => onEditSeatNumber(rowIndex, seatIndex, editNumber, setSelectedSeat)}
                      className="w-full border rounded px-1 py-0.5 text-sm"
                    />
                  </div>
                  <button
                    onClick={() => onDeleteSeat(rowIndex, seatIndex)}
                    className="bg-red-300 text-sm px-2 py-1 rounded w-full"
                  >Hapus Kursi</button>
                </div>
              )}
            </div>
          );
        })}
        <button onClick={() => onAddSeat(rowIndex)} className="w-8 h-8 bg-green-200 rounded">＋</button>
      </div>
    </div>
  );
};

const SeatLayout = () => {
  const [seats, setSeats] = useState([
    { rowLabel: 'A', seats: Array.from({ length: 20 }, (_, i) => ({ number: i + 1, status: 'available' })) },
    { rowLabel: 'B', seats: Array.from({ length: 20 }, (_, i) => ({ number: i + 1, status: 'available' })) },
    { rowLabel: 'C', seats: Array.from({ length: 20 }, (_, i) => ({ number: i + 1, status: 'available' })) },
  ]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const toggleSeatStatus = (rowIndex, seatIndex, newStatus) => {
    setSeats(prev =>
      prev.map((row, rIdx) =>
        rIdx === rowIndex ? {
          ...row,
          seats: row.seats.map((seat, sIdx) =>
            sIdx === seatIndex ? { ...seat, status: newStatus } : seat
          ),
        } : row
      )
    );
  };

  const moveRow = (rowIndex, direction) => {
    const newIndex = rowIndex + direction;
    if (newIndex < 0 || newIndex >= seats.length) return;
    const newSeats = [...seats];
    const temp = newSeats[rowIndex];
    newSeats[rowIndex] = newSeats[newIndex];
    newSeats[newIndex] = temp;
    setSeats(newSeats);
  };

  const deleteRow = (rowIndex) => {
    setSeats(prev => prev.filter((_, idx) => idx !== rowIndex));
  };

  const addSeatToRow = (rowIndex) => {
    setSeats(prev =>
      prev.map((row, idx) =>
        idx === rowIndex
          ? {
              ...row,
              seats: [...row.seats, { number: row.seats.length + 1, status: 'available' }]
            }
          : row
      )
    );
  };

  const editLabel = (rowIndex, newLabel) => {
    setSeats(prev =>
      prev.map((row, idx) =>
        idx === rowIndex ? { ...row, rowLabel: newLabel } : row
      )
    );
  };

  const editSeatNumber = (rowIndex, seatIndex, newNumber, closeTooltip) => {
    const newNum = parseInt(newNumber);
    if (isNaN(newNum)) return;

    const isDuplicate = seats[rowIndex].seats.some((seat, idx) => seat.number === newNum && idx !== seatIndex);

    if (isDuplicate) {
      alert("Nomor kursi sudah digunakan di baris ini.");
      return;
    }

    setSeats(prev =>
      prev.map((row, rIdx) =>
        rIdx === rowIndex
          ? {
              ...row,
              seats: row.seats.map((seat, sIdx) =>
                sIdx === seatIndex ? { ...seat, number: newNum } : seat
              )
            }
          : row
      )
    );
    closeTooltip(null);
  };

  const deleteSeat = (rowIndex, seatIndex) => {
    const seatKey = `${rowIndex}-${seatIndex}`;
    setSeats(prev =>
      prev.map((row, idx) =>
        idx === rowIndex ? {
          ...row,
          seats: row.seats.filter((_, sIdx) => sIdx !== seatIndex)
        } : row
      )
    );
  
    if (selectedSeat === seatKey) {
      setSelectedSeat(null);
    }
  };
  

  const addRow = () => {
    const nextLabel = String.fromCharCode(65 + seats.length);
    setSeats(prev => [...prev, { rowLabel: nextLabel, seats: Array(10).fill(0).map((_, i) => ({ number: i + 1, status: 'available' })) }]);
  };

  return (
    <div className="p-4">
      {seats.map((row, index) => (
        <SeatRow
          key={index}
          rowIndex={index}
          row={row}
          onToggleSeatStatus={toggleSeatStatus}
          onMoveRow={moveRow}
          onDeleteRow={deleteRow}
          onAddSeat={addSeatToRow}
          onEditLabel={editLabel}
          onEditSeatNumber={editSeatNumber}
          onDeleteSeat={deleteSeat}
          selectedSeat={selectedSeat}
          setSelectedSeat={setSelectedSeat}
        />
      ))}
      <button onClick={addRow} className="mt-4 p-2 bg-green-300 rounded">＋ Tambah Baris</button>
    </div>
  );
};

export default SeatLayout;