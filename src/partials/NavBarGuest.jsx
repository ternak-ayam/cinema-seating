import LogoTokoEvent from "../assets/img/logo-tokoEvent.png";
import { Link } from "react-router";

export default function NavBarGuest() {
  return (
    <header className="top-0 fixed bg-white shadow-sm w-full"> 
      <nav className="max-w-[1512px] mx-auto flex justify-between px-16 py-5">
        <div className="flex flex-1 justify-start items-center">
          <img src={LogoTokoEvent} alt="logo-tokoevent" className="w-20" />
        </div>
        <div className="flex items-center justify-center space-x-9 text-gray">
          <Link to="/"> Beranda</Link>
          <Link to="/booking-seat">Explore</Link>
          <Link to="/">Daftar Event</Link>
        </div>
        <div className="flex flex-1 justify-end items-center space-x-3 font-semibold">
          <Link to="/" className="px-3 py-2 border border-gray/30 rounded-md">
            Masuk
          </Link>
          <Link
            to="/"
            className="px-3 py-2 border border-black bg-yellow rounded-md"
          >
            Daftar
          </Link>
        </div>
      </nav>
    </header>
  );
}
