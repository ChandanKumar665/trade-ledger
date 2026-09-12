import { NavLink } from "react-router-dom";
import { protectedRoutes } from "../../routes";
// import "./navbar.css";
import "./navbarHb.css"

export default function SideNav({ sidebarOpen, closeSidebar }) {
    const userNav = protectedRoutes;
    return (
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <nav className="sidebar-menu">
                {
                    userNav.map((item, i) => {
                        return (
                            <NavLink
                                onClick={() => {
                                    // Close only on tablet/mobile
                                    if (window.innerWidth < 992) {
                                        closeSidebar();
                                    }
                                }}
                                key={i}
                                disabled={item.disabled}
                                className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                                to={item.path}>
                                <i class={`bi ${item.icon}`}></i> &nbsp;{item.name}
                            </NavLink>
                        )
                    })
                }
            </nav>
        </aside>
    )
}