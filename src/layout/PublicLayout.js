import { Outlet } from "react-router-dom";
import Navbar from "../components/utils/Navbar";
import { BRAND_CONFIG } from "../config";

const Footer = () => {
    return (
        <footer className="">
            <div className="container text-center">
                © 2026 {BRAND_CONFIG.name}. All Rights Reserved.
            </div>
        </footer>
    )
}
export default function PublicLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}