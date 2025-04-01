import { useState } from "react";
import SeatSelection from "../features/seating/SeatSelection";
import SeatLegenda from "../components/SeatLegenda";
import IconCross from "../assets/cross.svg";
import IconCheck from "../assets/document-check.svg";
import { Link } from "react-router";

export default function ModalSelection({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 transition-all">
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[600px] flex flex-col space-y-4">
        {/* Title Pilih Kursi */}
        <div className="flex justify-between items-center border-b border-gray/20 pb-4">
          <h2 className="text-xl font-bold">Pilih Kursi</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center "
          >
            <img src={IconCross} alt="" className="size-6" />
          </button>
        </div>
        <div className="border-b border-gray/20">
          {/* Seat Koleksi */}
          <SeatSelection />
          <SeatLegenda />
        </div>
        <div className="flex justify-end">
        <button className="flex items-center gap-2 px-3 py-2 border border-black bg-yellow rounded-md ">
        <img src={IconCheck} alt="" className="size-6"/>
          <Link
            to="/"
            className=""
          >
            Lanjut Pembayaran
          </Link>
        </button>
        </div>
      </div>
    </div>
  );
}
