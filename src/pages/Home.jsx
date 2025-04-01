import SideBar from "../partials/SideBar";
import NavBar from "../partials/NavBar";
import BreadCrumb from "../components/BreadCrumb";

export default function Home() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-full flex flex-col h-full overflow-y-auto">
        <div className="main-container">
          <NavBar />
          <div className="flex flex-col space-y-6 p-6">
            <BreadCrumb />
            <div className="content">
                <div className="title">

                </div>
                <div className="badge">

                </div>
                <div className="step">

                </div>
                <div className="form">

                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
