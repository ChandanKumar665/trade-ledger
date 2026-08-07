import { NavLink } from "react-router-dom";
import { protectedRoutes } from "../../routes";
import "./navbar.css";

export default function SideNav(props) {
    const userNav = protectedRoutes;
    return (
        <nav className="sidebar p-4">
            <div className="nav flex-column gap-2">
                {
                    userNav.map((item, i) => {
                        return (<NavLink key={i}
                            disabled={item.disabled}
                            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                            to={item.path}>
                            <i class={`bi ${item.icon}`}></i> &nbsp;{item.name}
                        </NavLink>)
                    })
                }
            </div>
        </nav>
    )
}