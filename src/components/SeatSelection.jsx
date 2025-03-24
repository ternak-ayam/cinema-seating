import { useDispatch, useSelector } from "react-redux";
import { toggleSeat } from "../features/seating/seatSlice";

const SeatSelection = () => {
  const dispatch = useDispatch();
  const { seats, selectedSeats } = useSelector((state) => state.seats);

  return (
    <div className="grid grid-cols-5 gap-2 p-4">
      {seats.map((_, index) => {
        const isSelected = selectedSeats.includes(index);

        return (
          <button
            key={index}
            className={`w-10 h-10 flex items-center justify-center rounded-md font-bold 
              ${isSelected ? "bg-green-500" : "bg-gray-300 hover:bg-gray-400"} transition`}
            onClick={() => dispatch(toggleSeat(index))}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default SeatSelection;
