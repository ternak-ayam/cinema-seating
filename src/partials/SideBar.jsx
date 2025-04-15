import LogoTokoEvent from "../assets/img/logo-tokoEvent.png";
import IconTicket from "../assets/ticket.svg";
import IconBank from "../assets/bank.svg";
import IconCalender from "../assets/calender.svg";
import IconChart from "../assets/chart-pie.svg";
import IconStack from "../assets/circle-stack.svg";
import IconLogOut from "../assets/log-out.svg";
import IconQr from "../assets/qr-code.svg";
import IconUser from "../assets/user.svg";
import IconCopy from "../assets/copy.svg";


export default function SideBar() {
  return (
    <div className="sidebar hidden min-w-[248px] bg-[#F5F5F5] p-4 h-full md:flex flex-col justify-between gap-9 font-medium">
      <div className="logo flex items-center justify-center">
        <img src={LogoTokoEvent} alt="logo-toko-event" className="w-24" />
      </div>
      <div className="navigation-item flex flex-col flex-auto gap-3">
        <div className="flex items-center space-x-4 px-3 py-2.5 hover:bg-yellow rounded-md">
          <img src={IconQr} alt="" className="size-6" />
          <p>Scan Ticket</p>
        </div>
        <div className="w-full h-[1px] bg-gray-200"></div>
        <div className="flex items-center space-x-4 px-3 py-2.5 hover:bg-yellow rounded-md transition-all">
          <img src={IconChart} alt="" className="size-6" />
          <p>Dashboard</p>
        </div>
        <div className="flex items-center space-x-4 px-3 py-2.5 hover:bg-yellow rounded-md transition-all">
          <img src={IconStack} alt="" className="size-6" />
          <p>Transaksi</p>
        </div>
        <div className="flex items-center space-x-4 px-3 py-2.5 bg-yellow rounded-md transition-all">
          <img src={IconCalender} alt="" className="size-6" />
          <p>Event</p>
        </div>
        <div className="flex items-center space-x-4 px-3 py-2.5 hover:bg-yellow rounded-md transition-all">
          <img src={IconTicket} alt="" className="size-6" />
          <p>Diskon</p>
        </div>
        <div className="flex items-center space-x-4 px-3 py-2.5 hover:bg-yellow rounded-md transition-all">
          <img src={IconBank} alt="" className="size-6" />
          <p>Keuangan</p>
        </div>
        <div className="w-full h-[1px] bg-gray-200"></div>
        <div className="flex items-center space-x-4 px-3 py-2.5 hover:bg-yellow rounded-md transition-all">
          <img src={IconUser} alt="" className="size-6" />
          <p>Profile</p>
        </div>
        <div className="flex items-center space-x-4 px-3 py-2.5 hover:bg-yellow rounded-md transition-all">
          <img src={IconLogOut} alt="" className="size-6" />
          <p>Log Out</p>
        </div>
      </div>
      <div className="copyright">
        <div className="flex items-center justify-center space-x-1 px-3 py-2.5 text-gray">
          <img src={IconCopy} alt="" className="size-6" />
          <p>tokoevent 2023 </p>
        </div>
      </div>
    </div>
  );
}
