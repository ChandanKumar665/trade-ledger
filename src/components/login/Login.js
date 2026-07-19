import Navbar from "../utils/Navbar";
import './login.css';
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate, Navigate } from "react-router-dom";
import { authUser } from "../../services/auth";
import { toast, ToastContainer } from "react-toastify";
import Brand from "./Brand";

export default function Login2() {
    const { user, login } = useAuth();
    const [isOtpSent, setIsOtpSend] = useState(false)
    const [data, setData] = useState({})
    const navigate = useNavigate();

    const submit = async (e) => {
        if (data.otp === '1234') {
            //check user
            const res = await authUser({ phone: data.mobile })
            console.log('res', res)
            if (res?.data?._id) {
                toast[res.type](res.message);
                login(res.data)
                navigate('/dashboard', { replace: true })
            } else {
                //user not found
                toast[res.type](res.message);
                navigate('/signup', {
                    state: {
                        phone: data.mobile
                    }
                });
            }
        } else {
            toast['error']('Invalid OTP')
        }
    }
    const sendOTP = () => {
        setIsOtpSend(true)
    }

    const changeHandler = (key, value) => {
        setData(prev => ({ ...prev, [key]: value }))
    }

    const btnProps = isOtpSent ? { btnHandler: submit, btnText: 'Submit' } : { btnHandler: sendOTP, btnText: 'Send OTP' }

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
                                            Welcome Back 👋
                                        </h2>

                                        <p className="text-muted mb-4">
                                            Sign in to continue to your dashboard.
                                        </p>

                                        <form>
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
                                                        value={data.mobile || ''}
                                                        disabled={isOtpSent}
                                                        placeholder="987654321"
                                                        onChange={(e) => changeHandler('mobile', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="form-label">
                                                    OTP
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-lock"></i>
                                                    </span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="1234"
                                                        value={data.otp || ''}
                                                        disabled={!isOtpSent}
                                                        required
                                                        onChange={(e) => changeHandler('otp', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={btnProps.btnHandler}
                                                className="btn btn-primary btn-login w-100"
                                            >
                                                {btnProps.btnText}
                                            </button>
                                        </form>
                                        <div className="divider my-4">
                                            <span className="text-muted small">
                                                Coming Soon
                                            </span>
                                        </div>
                                        <div className="row g-2">
                                            <div className="col">
                                                <button className="btn btn-outline-danger social-btn w-100">
                                                    <i className="bi bi-google me-2"></i>
                                                    Google
                                                </button>
                                            </div>
                                            <div className="col">
                                                <button className="btn btn-outline-dark social-btn w-100">
                                                    <i className="bi bi-github me-2"></i>
                                                    GitHub
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={1000} />
        </>
    )
}