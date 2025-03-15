const SeatLegenda = () => {
  return(
    <div className="flex justify-between items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-300 rounded-md"></div>
            <span>Tersedia</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-400 rounded-md"></div>
            <span>Dibooking</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-400 rounded-md"></div>
            <span>Terpilih</span>
        </div>
    </div>
  )
}

export default SeatLegenda;