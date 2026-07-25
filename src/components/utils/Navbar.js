
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import "./navbar.css";
import { getInitials } from './utils';

export default function Navbar(props) {
    const { user, logout, updateSelectedAccount, selectedAccId, accountList } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/')
    }

    const accountSelectHandler = (e) => {
        updateSelectedAccount(e.target.value)
    }
    useEffect(() => {
        if (accountList.length > 0) {
            updateSelectedAccount(selectedAccId || accountList[0])
        }
    }, [accountList, selectedAccId])

    return (
        <div className='shadow-light mb-1'>
            <nav className="navbar navbar-expand-lg navbar-dark shadow px-2">
                <a className="navbar-brand p-2" href="/">
                    <span>📈 Trade Ledger</span>
                </a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
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
                        </div></>
                }
            </nav>
        </div>
    )
}