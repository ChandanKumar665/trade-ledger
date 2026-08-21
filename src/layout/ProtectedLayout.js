import { Outlet } from "react-router-dom";
import Navbar from "../components/utils/Navbar";
import SideNav from "../components/utils/SideNav";
import Footer from "../components/utils/Footer";

export default function ProtectedLayout() {
    return (
        <>
            <Navbar />
            <div className="row p-2">
                <div className="col-lg-2 p-2">
                    <SideNav />
                </div>
                <main className="col-lg-10 p-2">
                    <Outlet />
                </main>
            </div>
        </>
    )
}