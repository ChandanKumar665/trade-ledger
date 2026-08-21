import { Outlet } from "react-router-dom";
import Footer from "../components/utils/Footer";
import Navbar from "../components/utils/Navbar";

export default function PublicLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}