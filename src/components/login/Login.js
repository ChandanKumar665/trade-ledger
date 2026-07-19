import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate, Navigate } from "react-router-dom";
import Navbar from "../utils/Navbar";
import { authUser } from "../../services/auth";

export default function Login() {
    const { user, login } = useAuth();
    const [isOtpSent, setIsOtpSend] = useState(false)
    const [data, setData] = useState({})
    const navigate = useNavigate();

    const submit = async (e) => {
        if (data.otp === '1234') {
            //check user
            const res = await authUser({ phone: data.mobile })
            if (res.data._id) {
                login(res.data)
                navigate('/dashboard', { replace: true })
            }
        }
    }
    const sendOTP = () => {
        setIsOtpSend(true)
    }

    const changeHandler = (key, value) => {
        setData(prev => ({ ...prev, [key]: value }))
    }

    const btnProps = isOtpSent ? { btnHandler: submit, btnText: 'Submit' } : { btnHandler: sendOTP, btnText: 'Send Otp' }

    return (
        <>
            <div className="mt-3">
                <div className="form-floating mb-3">
                    <input
                        id="floatingInput"
                        type="number"
                        className="form-control"
                        value={data.mobile || ''}
                        disabled={isOtpSent}
                        placeholder="987654321"
                        onChange={(e) => changeHandler('mobile', e.target.value)} />
                    <label htmlFor="floatingInput">Mobile</label>
                </div>
                {
                    isOtpSent &&
                    <div className="form-floating mb-3">
                        <input
                            id='floatingOTPInput'
                            type="number"
                            className="form-control"
                            placeholder="1234"
                            value={data.otp || ''}
                            onChange={(e) => changeHandler('otp', e.target.value)}
                        />
                        <label htmlFor="floatingOTPInput">OTP</label>
                    </div>
                }
                <button type="button" onClick={btnProps.btnHandler} className="btn btn-primary">{btnProps.btnText}</button>
            </div>
        </>
    )
}