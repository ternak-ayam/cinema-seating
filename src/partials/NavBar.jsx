import IconBar from "../assets/bar.svg";
import IconBell from "../assets/bell.svg";

export default function NavBar() {
    return (
        <nav className="w-full bg-white shadow-md">
            <div className="flex items-center justify-between p-6">
                <div className="block md:hidden">
                    <img src={IconBar} alt="icon-bar" className="size-6"/>
                </div>
                <div>
                    <p className="font-semibold text-xl">Event</p>
                </div>
                <div>
                    <img src={IconBell} alt="icon-bar" className="size-6"/>
                </div>
            </div>
        </nav>
    )
}