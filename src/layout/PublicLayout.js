import { Outlet } from "react-router-dom";
import Navbar from "../components/utils/Navbar";
import SideNav from "../components/utils/SideNav";

export default function PublicLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}