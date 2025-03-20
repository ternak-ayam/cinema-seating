const Seat = ({ seat, isBooked, isSelected, onSelect }) => {
  return (
    <button
      className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font bold
      ${
        isBooked
          ? "bg-red-400 cursor-not-allowed"
          : isSelected
          ? "bg-green-400"
          : "bg-gray-300"
      } transition` }
      onClick={()=> !isBooked && onSelect(seat)}
      disabled={isBooked}
    >
      {seat}
    </button>
  );
};

export default Seat;
