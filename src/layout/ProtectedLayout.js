import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/utils/Footer";
import NavbarHB from "../components/utils/NavbarHB";
import SideNav from "../components/utils/SideNav";

export default function ProtectedLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };
    return (
        <>
            <div className="dashboard-layout">
                <NavbarHB
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                />
                <SideNav
                    sidebarOpen={sidebarOpen}
                    closeSidebar={closeSidebar}
                />
                {/* Mobile / Tablet Overlay */}
                <div
                    className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
                    onClick={closeSidebar}
                />
                <main className="main-content mb-3">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}