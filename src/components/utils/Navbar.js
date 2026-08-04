
import { useEffect } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import "./navbar.css";
import { getInitials } from './utils';
import { publicRoutes } from '../../routes';
import { logoutUser } from '../../services/auth';
import { BRAND_CONFIG } from '../../config';
import logo from "../../asset/logo.png";

export default function Navbar(props) {
    const { user, logout, updateSelectedAccount, selectedAccId, accountList } = useAuth();
    const navigate = useNavigate();

    const finalNav = !user && publicRoutes

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
        <div className='shadow-light mb-1'>
            <nav className="navbar navbar-expand-lg navbar-dark shadow px-2">
                <a className="navbar-brand p-2 logo-container" href="/">
                    {/* <img src={logo} alt='logo' /> */}
                    {/* <span class="logo-icon">
                        📈
                    </span> */}
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
                {
                    user &&
                    <>
                        <div className="d-flex p-2">
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
                        <div className="d-flex p-2">
                            <div className="dropdown">
                                <button
                                    className="dropdown-toggle profile-btn"
                                    type="button"
                                    id="dropdownMenu2"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {getInitials(user.name)}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu2">
                                    <li><button className="dropdown-item" type="button" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </div>
                        </div>
                    </>
                }
            </nav>
        </div>
    )
}