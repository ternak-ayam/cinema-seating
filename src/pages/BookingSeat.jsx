import Seat from "../components/Seat";
import SeatLegenda from "../components/SeatLegenda";
import SeatSelecton from "../components/SeatSelection";

const BookingSeat = () => {
  return (
    <div className="min-h-screen grid grid-cols-2">
      <SeatSelecton />
    </div>
  );
};

export default BookingSeat;
