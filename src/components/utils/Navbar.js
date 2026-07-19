
import { useEffect } from 'react';
import logo from '../../asset/logo.png'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate, NavLink } from "react-router-dom";

export default function Navbar(props) {
    const { user, logout, updateSelectedAccount, selectedAccId, accountList } = useAuth();
    const navigate = useNavigate();

    const userNav = [{ name: 'Dashboard', key: 'dbh', path: '/dashboard' },
    { name: 'Trade History', key: 'th', path: '/trades' },
    { name: 'Accounts', key: 'acc', path: '/accounts' }];

    const defaultNav = [{ name: 'Login', path: '/login' }, { name: 'Privacy Policy', path: '/privacy' }, { name: 'About', path: '/about' }];
    const cls = `av-item nav-link`;
    const finalNav = user ? userNav : defaultNav;

    const handleLogout = () => {
        logout();
        navigate('/')
    }
    const goToProfile = () => {
        navigate('/profile')
    }
    const accountSelectHandler = (e) => {
        updateSelectedAccount(e.target.value)
    }
    useEffect(() => {
        if (accountList.length > 0) {
            updateSelectedAccount(selectedAccId || accountList[0])
        }
    }, [accountList])

    return (
        <div className='shadow mb-4'>
            <nav className="navbar navbar-expand-sm navbar-light bg-light px-2">
                <a className="navbar-brand p-2" href="#">
                    {/* <img src={logo} height={50} width={50} /> */}
                    <i class="bi bi-bar-chart-line-fill"></i>
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
                    <div className="navbar-nav">
                        {
                            finalNav.map((item, i) => {
                                const isActive = item.key === props.active_id
                                return <NavLink key={i} className={`av-item nav-link ${!isActive ? 'active' : ''}`} to={item.path}>{item.name}</NavLink>
                            })
                        }
                    </div>
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
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenu2"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-person-circle"></i>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <li><button className="dropdown-item" type="button" onClick={goToProfile}>Profile</button></li>
                                    <li><button className="dropdown-item" type="button" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </div>
                        </div></>
                }
            </nav>
        </div>
    )
}