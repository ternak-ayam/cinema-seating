import Seat from "../components/Seat";
import SeatLegenda from "../components/SeatLegenda";
import SeatSelecton from "../components/SeatSelection";
import Counter from "../features/counter/Counter";

const BookingSeat = () => {
  return (
    <div className="min-h-screen grid grid-cols-2">
      <SeatSelecton />
      <Counter />
    </div>
  );
};

export default BookingSeat;
