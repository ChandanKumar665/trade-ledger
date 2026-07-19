import Navbar from "../utils/Navbar";
import './login.css';
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { authUser } from "../../services/auth";
import { toast, ToastContainer } from "react-toastify";
import Brand from "./Brand";
import { createUser } from "../../services/user";

export default function Register(props) {
    const { user, login } = useAuth();
    const [isOtpSent, setIsOtpSend] = useState(false)
    const [data, setData] = useState({})
    const navigate = useNavigate();
    const { state } = useLocation();


    const submit = async (e) => {
        e.preventDefault()
        const { name, trading_exp, email } = data
        const payload = {
            phone: state?.phone,
            name,
            email,
            trading_exp
        }
        const res = await createUser(payload);
        if (res?.data?._id) {
            toast[res.type](res.message);
            login(res.data)
            navigate('/dashboard', { replace: true })
        }
    }

    const sendOTP = () => {
        setIsOtpSend(true)
    }

    const changeHandler = (key, value) => {
        setData(prev => ({ ...prev, [key]: value }))
    }


    return (
        <>
            <Navbar />
            <div className="py-4">
                <div className="row justify-content-center align-items-center min-vh-50">
                    <div className="col-lg-9">
                        <div className="card shadow-lg login-card">
                            <div className="row g-0">
                                {/* <!-- Left Side --> */}
                                <Brand />

                                {/* <!-- Right Side --> */}
                                <div className="col-lg-7">
                                    <div className="card-body p-5">
                                        <h2 className="fw-bold mb-2">
                                            Create Account
                                        </h2>

                                        <p className="text-muted mb-4">
                                            Start tracking your trades in minutes.
                                        </p>

                                        <form onSubmit={submit}>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Mobile
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-phone"></i>
                                                    </span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={state?.phone || ''}
                                                        required
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Name
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-person"></i>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data.name || ''}
                                                        required
                                                        onChange={(e) => changeHandler('name', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Email
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-envelope"></i>
                                                    </span>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        value={data.email || ''}
                                                        required
                                                        onChange={(e) => changeHandler('email', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Trading Experience (in Years)
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-briefcase"></i>
                                                    </span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={data.trading_exp || ''}
                                                        onChange={(e) => changeHandler('trading_exp', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div class="mb-4 form-check">
                                                <input class="form-check-input"
                                                    type="checkbox"
                                                    id="terms"
                                                    required
                                                />

                                                <label class="form-check-label" htmlFor="terms">
                                                    I agree to the &nbsp;
                                                    <a href="#">Terms & Conditions</a>
                                                    &nbsp; and &nbsp;
                                                    <a href="#">Privacy Policy</a>.
                                                </label>

                                            </div>
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-register w-100"
                                            >
                                                <i class="bi bi-person-plus-fill me-2"></i>
                                                Create Account
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}