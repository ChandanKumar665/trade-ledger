import "./navbarHb.css";
import { useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import { publicRoutes, protectedRoutes } from '../../routes';
import { logoutUser } from '../../services/auth';
import { getFirstName } from './utils';

export default function NavbarHB({ toggleSidebar, sidebarOpen }) {
    const { user, logout, updateSelectedAccount, selectedAccId, accountList } = useAuth();
    const navigate = useNavigate();

    const finalNav = !user ? publicRoutes : protectedRoutes

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
        <header className="navbar-custom navbar-dark">
            {/* Top Row: Hamburger + Brand */}

            <div className="navbar-left">
                <button
                    className="navbar-toggler hamburger-btn"
                    type="button"
                    onClick={toggleSidebar}
                    aria-expanded={sidebarOpen}
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <a className="navbar-brand p-2 logo-container" href="/">
                    <div className="logo-title">
                        <span className="logo-trade">Trade</span>
                        <span className="logo-memo">Memo</span>
                    </div>
                    <div className="logo-tagline">
                        Journal • Analyze • Improve
                    </div>
                </a>
            </div>

            {
                user &&
                <div className="navbar-right">
                    <div className="dropdown">
                        <select className="form-select form-select-sm" aria-label="Default select example" onChange={accountSelectHandler}>
                            {
                                accountList.length > 0 ? accountList.map(account => <option
                                    key={account._id}
                                    value={account._id}
                                    selected={account._id === selectedAccId}
                                >
                                    {account.name}
                                </option>
                                ) : <option>--No Account--</option>
                            }
                        </select>
                    </div>
                    <div class="dropdown">
                        <button
                            class="btn btn-light dropdown-toggle profile-btn"
                            data-bs-toggle="dropdown"
                        >
                            {/* <i class="bi bi-person-circle"></i> */}
                            <span class="user-name">
                                {getFirstName(user.name)}
                            </span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu2">
                            <li><button className="dropdown-item" type="button" onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            }
        </header>
    )
}