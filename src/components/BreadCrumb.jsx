import IconLeft from "../assets/left-arrow.svg";
import IconChevron from "../assets/chevron-right.svg";


export default function BreadCrumb() {
    return (
        <div className="w-full">
            <div className="flex justify-start items-center space-x-2 text-gray font-bold">
                <img src={IconLeft} alt="icon-left" className="size-5" />
                <p>Event</p>
                <img src={IconChevron} alt="icon-left" className="size-5 text-" />
                <p className="text-blue">Buat Event</p>
            </div>
        </div>
    )
}