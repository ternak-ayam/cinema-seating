import BreadCrumb from "../components/BreadCrumb";
import IconTicket from "../assets/ticket.svg";
import Event_1 from "../assets/img/event-1.png";
import ModalSelection from "../components/ModalSelection";
import { useState } from "react";
import NavBarGuest from "../partials/NavBarGuest";

const BookingSeat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      {/* Navigasi */}
      <NavBarGuest />
      {/* Section Konten */}
      <section className="max-w-[1512px] mx-auto pt-20 px-4 md:px-16 min-h-screen relative">
        <div className="pt-8 flex flex-col gap-6">
          <BreadCrumb />
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <img
                src={Event_1}
                alt="event-1"
                className="w-full object-cover "
              />
            </div>
            <div className="md:col-span-4">
              <div className="md:border md:border-gray/30 rounded-md md:p-5 flex flex-col gap-5">
                <div className="tags flex flex-wrap gap-2">
                  <p className="text-[#CB3A31] px-4 py-0.5 bg-[#FFF4F2] border border-[#EEB4B0] font-semibold rounded-md">
                    Offline Event
                  </p>
                  <p className="text-[#CB3A31] px-4 py-0.5 bg-[#FFF4F2] border border-[#EEB4B0] font-semibold rounded-md">
                    Event
                  </p>
                </div>
                <div className="title">
                  <p className="text-2xl font-semibold">Kramat Unmas</p>
                </div>
                <div className="w-full h-[1px] bg-gray-200"></div>
                <div className="hidden md:block">
                  <button
                    className="bg-yellow w-full text-center px-3 py-2 rounded-md border border-black font-semibold flex items-center gap-2 justify-center"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <img src={IconTicket} alt="" className="size-6" />
                    <span>Pilih Tiket</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block md:hidden absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray/20 shadow-[0px_12px_12px_0px_rgba(0,0,0,0.1)]">
          <button
            className="bg-yellow w-full text-center px-3 py-2 rounded-md border border-black font-semibold flex items-center gap-2 justify-center"
            onClick={() => setIsModalOpen(true)}
          >
            <img src={IconTicket} alt="" className="size-6" />
            <span>Pilih Tiket</span>
          </button>
        </div>
      </section>
      <ModalSelection
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default BookingSeat;
