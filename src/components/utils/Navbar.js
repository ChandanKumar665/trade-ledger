
import { useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import { publicRoutes } from '../../routes';
import { logoutUser } from '../../services/auth';
import "./navbar.css";

export default function Navbar(props) {
    const { user, logout, updateSelectedAccount, selectedAccId, accountList } = useAuth();
    const navigate = useNavigate();

    const finalNav = publicRoutes

    const handleLogout = async () => {
        const res = await logoutUser();
        logout();
        navigate('/')
    }

    const accountSelectHandler = (e) => {
        updateSelectedAccount(e.target.value)
    }
    useEffect(() => {
        if (accountList?.length > 0) {
            updateSelectedAccount(selectedAccId || accountList[0])
        }
    }, [accountList, selectedAccId])

    return (
        <>
            <div className='shadow-light'>
                <nav className="navbar navbar-expand-lg navbar-dark shadow px-2">
                    <a className="navbar-brand p-2 logo-container" href="/">
                        <div className="logo-title">
                            <span className="logo-trade">Trade</span>
                            <span className="logo-memo">Memo</span>
                        </div>
                        <div className="logo-tagline">
                            Journal • Analyze • Improve
                        </div>
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        {
                            finalNav.length > 0 &&
                            <div className="navbar-nav">
                                {
                                    finalNav.map((item, i) => {
                                        return (
                                            <NavLink
                                                key={i}
                                                className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                                                to={item.path}
                                            >
                                                {item.name}
                                            </NavLink>)
                                    })
                                }
                            </div>
                        }
                    </div>

                </nav>
            </div>
        </>
    )
}