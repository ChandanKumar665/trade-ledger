import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { authUser } from "../../services/auth";
import { sendMobileOTP } from "../../services/firebaseSrvc";
import Brand from "./Brand";
import './login.css';

const COUNTRY_CODE = '+91'

export default function Login2() {
    const { user, login } = useAuth();
    const [isOtpSent, setIsOtpSend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [btnText, setBtnText] = useState('Send OTP')
    const [data, setData] = useState({})
    const navigate = useNavigate();


    const goToSignUp = (state) => {
        navigate('/signup', state);
    }
    const devLogin = async (e) => {
        setIsLoading(false)
        setBtnText('Submit');
        if (data.otp === '1234') {
            //check user
            const res = await authUser({ phone: data.mobile, fbtoken: '' })
            if (res?.data?.token) {
                toast[res.type](res.message);
                login(res.data.token)
                navigate('/dashboard', { replace: true })
            } else {
                //user not found
                toast[res.type](res.message);
                goToSignUp({
                    state: {
                        phone: data.mobile
                    }
                })
            }
        } else {
            toast['error']('Invalid OTP')
        }
    }

    const submit = async (e) => {
        //verify
        try {
            if (!data.otp) {
                return toast['error']('Please enter OTP');
            }

            setIsLoading(true);
            setBtnText('Submitting...')

            const result = await window.confirmationResult.confirm(data.otp);
            if (!result) {
                return toast['error']('Invalid OTP')
            }
            const firebaseToken = await result.user.getIdToken();
            //send fbcode to server
            const res = await authUser({ phone: data.mobile, fbtoken: firebaseToken });
            if (res?.statusCode === 200) {
                toast[res.type](res.message);
                login();
                navigate('/dashboard', { replace: true })
            } else {
                //user not found
                toast[res.type](res.message);
                goToSignUp({
                    state: {
                        phone: data.mobile
                    }
                })
            }
        } catch (err) {
            reset()
            toast['error'](err.message)
        }
    }
    const reset = () => {
        setIsLoading(false);
        setBtnText('Send OTP');
    }
    const sendOTP = async () => {
        try {
            if (!data.mobile || data.mobile.length != 10) {
                return toast['error']('Invalid phone no')
            }
            setIsLoading(true);
            setBtnText('Sending OTP...');
            await sendMobileOTP(`${COUNTRY_CODE}${data.mobile}`);
            setIsOtpSend(true);
            toast['success']('OTP Sent');
            setBtnText('Submit');
            setIsLoading(false);
        } catch (error) {
            toast['error']('Something went wrong');
            reset();
        }

    }

    const changeHandler = (key, value) => {
        setData(prev => ({ ...prev, [key]: value }))
    }

    const btnProps = isOtpSent ?
        { btnHandler: submit, btnText: 'Submit' } :
        { btnHandler: sendOTP, btnText: 'Send OTP' };
    return (
        <>
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
                                                        <i className="bi bi-phone"></i> +91
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
                                                disabled={isLoading}
                                                onClick={btnProps.btnHandler}
                                                className="btn btn-primary btn-login w-100"
                                            >
                                                {
                                                    isLoading && <span className="btn-loader">
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                }
                                                {btnText}
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
                                        <div id="recaptcha-container"></div>
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