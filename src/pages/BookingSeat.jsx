import BreadCrumb from "../components/BreadCrumb";
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
      <section className="max-w-[1512px] mx-auto pt-20 md:px-16 min-h-screen">
        <div className="pt-8 flex flex-col gap-6">
          <BreadCrumb />
          <div className="grid md:grid-cols-12 gap-6">
            <div className="col-span-8">
              <img
                src={Event_1}
                alt="event-1"
                className="w-full object-cover "
              />
            </div>
            <div className="col-span-4">
              <div className="border border-gray/30 rounded-md p-5 flex flex-col gap-5">
                <div className="tags flex flex-wrap gap-2">
                  <p className="text-[#CB3A31] px-4 py-0.5 bg-[#FFF4F2] border border-[#EEB4B0] font-semibold rounded-md">
                    Offline Event
                  </p>
                  <p className="text-[#CB3A31] px-4 py-0.5 bg-[#FFF4F2] border border-[#EEB4B0] font-semibold rounded-md">
                    Event
                  </p>
                </div>
                <div className="title">
                  <p>Kramat Unmas</p>
                </div>
                <div className="w-full h-[1px] bg-gray-200"></div>
                <div>
                  <button 
                    className="bg-yellow w-full text-center px-3 py-2 rounded-md border border-black"
                    onClick={()=>setIsModalOpen(true)}
                    >
                    Pilih kursi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalSelection isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} />
        <section>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et perferendis possimus veniam voluptates, consequatur fuga earum. Doloribus excepturi adipisci rem. Necessitatibus enim in eum nisi distinctio quia temporibus sint natus.</p>
        </section>
    </div>
  );
};

export default BookingSeat;
