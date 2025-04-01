const SeatLegenda = () => {
  return(
    <div className="flex items-center gap-4 text-sm my-4">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded-md"></div>
            <span>Tersedia</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-md"></div>
            <span>Dibooking</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-md"></div>
            <span>Terpilih</span>
        </div>
    </div>
  )
}

export default SeatLegenda;