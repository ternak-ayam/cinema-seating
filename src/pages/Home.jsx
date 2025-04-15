import SideBar from "../partials/SideBar";
import NavBar from "../partials/NavBar";
import BreadCrumb from "../components/BreadCrumb";
import IconCircle from "../assets/loop.svg";
import IconSampah from "../assets/trash.svg";
import IconUpload from "../assets/upload.svg";
import { useState } from "react";
import SeatEditor from "../components/SeatEditor";
import SeatLegenda from "../components/SeatLegenda";

export default function Home() {
  const [imgPreview, setImgPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ start: "", end: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);

  const handleAddSlot = () => {
    if (!newSlot.start || !newSlot.end) {
      alert("Waktu mulai dan berakhir harus diisi!");
      return;
    }

    const isDuplicate = slots.some(
      (slot) => slot.start === newSlot.start && slot.end === newSlot.end
    );
    if (isDuplicate) {
      alert("Waktu sudah ada.");
      return;
    }

    setSlots([...slots, { ...newSlot, confirmed: true }]);
    setNewSlot({ start: "", end: "" });
  };

  const openModal = (index) => {
    setSelectedSlotIndex(index);
    setModalOpen(true);
  };

  const updateSlotTime = (field, value) => {
    const updated = [...slots];
    updated[selectedSlotIndex][field] = value;
    setSlots(updated);
  };

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-full flex flex-col h-full overflow-y-auto">
        <div className="main-container">
          <NavBar />
          <div className="flex flex-col space-y-6 p-6">
            <BreadCrumb />
            <div className="content md:px-16 px-4 flex flex-col gap-6">
              <div className="title">
                <h1 className="text-2xl font-semibold text-center">
                  Buat Event
                </h1>
              </div>
              <div className="badge bg-[#FFFCF5] border border-[#F8E0A5] rounded-md w-full p-4 flex justify-between items-center">
                <div>
                  <p>
                    Paket yang digunakan saat ini:{" "}
                    <span className="font-bold">Paket Mahasiswa</span>
                  </p>
                </div>
                <div className="p-2 border rounded-md bg-yellow flex items-center gap-2">
                  <img src={IconCircle} alt="" className="size-6" />
                  <p className=" font-semibold">Upgrade Paket</p>
                </div>
              </div>
              <div className="step grid grid-cols-3 w-full gap-4">
                <div className="border-b-4 pb-3 border-b-yellow">
                  <p className="text-lg font-semibold">1. Informasi Acara</p>
                </div>
                <div className="border-b-4 pb-3 border-b-gray/20 opacity-50">
                  <p className="text-lg font">2. Tiket</p>
                </div>
                <div className="border-b-4 pb-3 border-b-gray/20 opacity-50">
                  <p className="text-lg font">3. Penanggung Jawab</p>
                </div>
              </div>
              <div className="form">
                <div className="flex flex-col gap-6">
                  {/* Upload file gambar */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">
                      Poster Event{" "}
                      <span className="text-red-600 font-bold">*</span>
                    </label>
                    <div className="w-full bg-[#F5F5F5] border border-gray/20 rounded-md px-4 py-8 flex flex-col items-center justify-center gap-4 relative">
                      {imgPreview ? (
                        <div className="mt-4">
                          <img
                            src={imgPreview}
                            alt="Preview"
                            className="max-w-[400px] max-h-[300px] object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <img
                          src="https://placehold.co/300x200"
                          alt="default-picture"
                          id="default-picture"
                          className="rounded-md"
                        />
                      )}
                      <span className="text-[#757575]">
                        Maksimal ukuran file 2MB (Format JPG, PNG)
                      </span>
                      <div className="flex gap-2">
                        <button
                          className="relative flex gap-2 border border-[#EEB4B0] px-3 py-2 rounded-md items-center bg-[#FFF4F2]"
                          onClick={() => setImgPreview(null)}
                        >
                          <img src={IconSampah} alt="" className="size-6 " />
                          <span className="text-[#CB3A31] font-bold">
                            Hapus Gambar
                          </span>
                        </button>
                        <button className="relative flex items-center gap-2 border px-3 py-2 rounded-md bg-yellow ">
                          <input
                            type="file"
                            className="absolute w-full h-full opacity-0"
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                          <img src={IconUpload} alt="" className="size-6" />
                          <span>Unggah Gambar</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Input Title */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">
                      Judul Event{" "}
                      <span className="text-red-600 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Judul Event"
                      className="border border-gray/20 rounded-md px-4 py-2 w-full"
                    />
                  </div>

                  {/* Tipe Acara */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">
                      Tipe Acara{" "}
                      <span className="text-red-600 font-bold">*</span>
                    </label>
                    <div className="flex gap-4 font-semibold">
                      <div>
                        <input
                          type="radio"
                          name="tipe-acara"
                          id="biasa"
                          value="biasa"
                          className="checked:bg-yellow bg-yellow"
                        />
                        <label htmlFor="biasa" className="ml-2">
                          Biasa
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="tipe-acara"
                          id="cinema"
                          value="cinema"
                        />
                        <label htmlFor="cinema" className="ml-2">
                          Cinema
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Format Acara */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="">
                        Pilih Format Acara{" "}
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <select
                        name=""
                        id=""
                        className="border border-gray/20 rounded-md px-4 py-2 w-full"
                      >
                        <option value="" disabled selected hidden>
                          -- Format Acara --
                        </option>
                        <option value="offline">Offline</option>
                        <option value="online">Online</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="">
                        Pilih Kategori Acara{" "}
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <select
                        name=""
                        id=""
                        className="border border-gray/20 rounded-md px-4 py-2 w-full"
                      >
                        <option value="" disabled selected hidden>
                          -- Kategori Acara --
                        </option>
                        <option value="hiburan">Hiburan</option>
                        <option value="konser">Konser</option>
                      </select>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="w-full h-[1px] bg-gray-200"></div>

                  {/* Tanggal Pelaksanaan Kegiatan */}
                  <div>
                    <h3 className="text-xl text-[#CB3A31] font-semibold mb-2">
                      Tanggal Pelaksanaan Kegiatan
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="">
                          Tanggal Mulai{" "}
                          <span className="text-red-600 font-bold">*</span>
                        </label>
                        <input
                          type="date"
                          className="border border-gray/20 rounded-md px-4 py-2 w-full"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="">
                          Tanggal Berakhir{" "}
                          <span className="text-red-600 font-bold">*</span>
                        </label>
                        <input
                          type="date"
                          className="border border-gray/20 rounded-md px-4 py-2 w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Waktu Pelaksanaan */}
                    <div>
                      {/* Title */}
                      <h3 className="text-xl text-[#CB3A31] font-semibold mb-2">
                        Waktu Pelaksanaan Kegiatan
                      </h3>

                      {/* Container Waktu Yang FIX */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {slots.map((slot, index) => (
                          <div
                            key={index}
                            className="px-3 py-2 bg-[#FFFCF5] border border-yellow rounded-md text-black font-semibold cursor-pointer"
                            onClick={() => openModal(index)}
                          >
                            {slot.start} : {slot.end}
                          </div>
                        ))}
                      </div>

                      {/* Input Buat Tambah Waktu */}
                      <div className="grid md:grid-cols-12 gap-4">
                        <div className="col-span-5 flex flex-col gap-2">
                          <label>Waktu Mulai</label>
                          <input
                            type="time"
                            value={newSlot.start}
                            onChange={(e) =>
                              setNewSlot({ ...newSlot, start: e.target.value })
                            }
                            className="border border-gray/20 rounded-md px-4 py-2 w-full"
                          />
                        </div>
                        <div className="col-span-5 flex flex-col gap-2">
                          <label>Waktu Berakhir</label>
                          <input
                            type="time"
                            value={newSlot.end}
                            onChange={(e) =>
                              setNewSlot({ ...newSlot, end: e.target.value })
                            }
                            className="border border-gray/20 rounded-md px-4 py-2 w-full"
                          />
                        </div>
                        <div className="col-span-2 place-content-end">
                          <button
                            onClick={handleAddSlot}
                            className="bg-yellow border px-4 py-2 rounded w-full"
                          >
                            Tambah
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Modal Edit Waktu */}
                    {modalOpen && selectedSlotIndex !== null && (
                      <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow max-h-[80%] w-[1024px] overflow-x-auto ">
                          <h4 className="text-lg font-semibold mb-4">
                            Edit Waktu Tayang
                          </h4>
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="">
                              <label>Waktu Mulai</label>
                              <input
                                type="time"
                                value={slots[selectedSlotIndex].start}
                                onChange={(e) =>
                                  updateSlotTime("start", e.target.value)
                                }
                                className="border border-gray/20 rounded-md px-4 py-2 w-full"
                              />
                            </div>
                            <div className="">
                              <label>Waktu Berakhir</label>
                              <input
                                type="time"
                                value={slots[selectedSlotIndex].end}
                                onChange={(e) =>
                                  updateSlotTime("end", e.target.value)
                                }
                                className="border border-gray/20 rounded-md px-4 py-2 w-full"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p>Layout Kursi</p>
                            <div className="p-4 bg-gray-100 rounded-md w-full ">
                              <SeatEditor />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              onClick={() => setModalOpen(false)}
                              className="bg-gray-300 px-4 py-1 rounded"
                            >
                              Tutup
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
