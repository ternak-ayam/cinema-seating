import { useDispatch, useSelector } from "react-redux";
import { toggleSeat } from "./seatSlice";

const SeatSelection = () => {
  const dispatch = useDispatch();
  const { selectedSeats, labels } = useSelector((state) => state.seats);

  return (
    <div className="grid grid-cols-10 gap-3 p-4 bg-[#F5F5F5]">
      {Array.from({ length: 50 }, (_, index) => {
        const row = index % 10; 
        const col = Math.floor(index / 10); 
        const seatLabel = `${labels[col]}${row + 1}`; 
        const isSelected = selectedSeats.includes(index);

        return (
          <button
            key={index}
            className={`w-full h-10 flex items-center justify-center rounded-md font-semibold place-self-center border border-gray-200
              ${
                isSelected
                  ? "bg-green-500 text-white"
                  : "bg-white hover:bg-gray-200"
              } transition`}
            onClick={() => dispatch(toggleSeat(index))}
          >
            {seatLabel}
          </button>
        );
      })}
    </div>
  );
};

export default SeatSelection;
