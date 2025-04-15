import React, { useState } from "react";
import SeatTooltip from "./SeatTooltip";
import IconBar from "../assets/bar.svg";
import IconSampah from "../assets/trash.svg";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const SeatEditor = () => {
  const generateSeats = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      number: `${i + 1}`,
      status: "available",
    }));
  };

  const generateDefaultSeats = (rowLabels = "ABCDEFGHIJ", seatsPerRow = 10) => {
    return rowLabels.split("").map((label) => ({
      label,
      seats: generateSeats(seatsPerRow),
    }));
  };
  const [seatRows, setSeatRows] = useState(() => generateDefaultSeats());

  const [selectedSeat, setSelectedSeat] = useState({
    rowIndex: null,
    seatIndex: null,
  });

  const toggleSeatTooltip = (rowIdx, seatIdx) => {
    setSelectedSeat({ rowIndex: rowIdx, seatIndex: seatIdx });
  };

  const handleSeatChange = (rowIdx, seatIdx, updatedSeat) => {
    const updatedRows = [...seatRows];
    updatedRows[rowIdx].seats[seatIdx] = {
      ...updatedRows[rowIdx].seats[seatIdx],
      ...updatedSeat,
    };
    setSeatRows(updatedRows);
  };

  const handleDeleteSeat = (rowIdx, seatIdx) => {
    const updatedRows = [...seatRows];
    updatedRows[rowIdx].seats.splice(seatIdx, 1);
    setSeatRows(updatedRows);
    setSelectedSeat({ rowIndex: null, seatIndex: null });
  };

  const handleAddSeat = (rowIdx) => {
    const updatedRows = [...seatRows];
    const nextNumber = updatedRows[rowIdx].seats.length + 1;
    updatedRows[rowIdx].seats.push({
      number: `${nextNumber}`,
      status: "available",
    });
    setSeatRows(updatedRows);
  };

  const editLabel = (rowIdx, newLabel) => {
    if (newLabel.length > 1) {
      alert("Label hanya boleh 1 huruf kapital (A-Z)!");
      return;
    }

    const updatedRows = [...seatRows];

    const labelExists = updatedRows.some((row, idx) => {
      return row.label === newLabel && idx !== rowIdx;
    });

    if (labelExists) {
      alert("Label sudah digunakan di baris lain!");
      return;
    }

    updatedRows[rowIdx].label = newLabel;
    setSeatRows(updatedRows);
  };

  const getNextLabel = (index) => {
    const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (index < 26) return base[index];
    const first = base[Math.floor(index / 26) - 1];
    const second = base[index % 26];
    return first + second;
  };

  const handleAddRow = () => {
    const nextLabel = getNextLabel(seatRows.length);
    const newRow = {
      label: nextLabel,
      seats: generateSeats(10),
    };
    setSeatRows([...seatRows, newRow]);
  };

  const handleDeleteRow = (indexToRemove) => {
    const updated = seatRows.filter((_, index) => index !== indexToRemove);
    setSeatRows(updated);
  };

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => {
          const { source, destination } = result;

          if (!destination || source.index === destination.index) return;

          const updatedRows = [...seatRows];
          const [movedRow] = updatedRows.splice(source.index, 1);
          updatedRows.splice(destination.index, 0, movedRow);

          setSeatRows(updatedRows);
        }}
      >
        <Droppable droppableId="all-rows" direction="vertical">
          {(provided) => (
            <div
              className="space-y-2 w-full"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {seatRows.map((row, rowIndex) => (
                <Draggable
                  key={`row-${rowIndex}`}
                  draggableId={`row-${rowIndex}`}
                  index={rowIndex}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center gap-4 relative"
                    >
                      <div className="w-6 font-bold">
                        <input
                          value={row.label}
                          onChange={(e) => editLabel(rowIndex, e.target.value)}
                          className="w-8 text-center border rounded"
                        />
                      </div>

                      <div
                        {...provided.dragHandleProps}
                        className="cursor-move text-gray-500 hover:text-black flex items-center justify-center "
                      >
                        <img src={IconBar} alt="" className="size-6" />
                      </div>

                      <div className="bg-red-200/50 flex items-center justify-center rounded-md p-1 cursor-pointer hover:bg-red-300">
                        <button
                          onClick={() => handleDeleteRow(rowIndex)}
                          className=""
                          title={`Hapus baris ${row.label}`}
                        >
                          <img src={IconSampah} alt="" className="size-6 " />
                        </button>
                      </div>
                      {/* Kursi */}
                      <div className="grid grid-cols-10 md:grid-cols-20 gap-2 relative w-full">
                        {row.seats.map((seat, seatIndex) => (
                          <div
                            key={seatIndex}
                            className={`relative inline-block border border-black border-b-3 ${
                              seat.status === "blocked"
                                ? "text-white bg-red-600"
                                : "bg-white"
                            } py-1 text-center place-content-center rounded cursor-pointer`}
                            onClick={() =>
                              toggleSeatTooltip(rowIndex, seatIndex)
                            }
                          >
                            {seat.number}
                            {selectedSeat.rowIndex === rowIndex &&
                              selectedSeat.seatIndex === seatIndex && (
                                <SeatTooltip
                                  seat={seat}
                                  rowIndex={rowIndex}
                                  seatIndex={seatIndex}
                                  allSeats={seatRows}
                                  onClose={() =>
                                    setSelectedSeat({
                                      rowIndex: null,
                                      seatIndex: null,
                                    })
                                  }
                                  onChangeSeat={handleSeatChange}
                                  onDeleteSeat={handleDeleteSeat}
                                />
                              )}
                          </div>
                        ))}

                        <button
                          onClick={() => handleAddSeat(rowIndex)}
                          className="relative inline-block bg-yellow-400 rounded hover:bg-yellow-500 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="mt-2">
        <button
          onClick={handleAddRow}
          className="border-2 border-gray-500 bg-gray-300/20 px-3 py-1 rounded-md"
        >
          Tambah Row +
        </button>
      </div>
    </>
  );
};

export default SeatEditor;
