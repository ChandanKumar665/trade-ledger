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
                <div className="mb-3">
                    <label className="form-label">Mobile</label>
                    <input
                        type="number"
                        className="form-control"
                        value={data.mobile || ''}
                        disabled={isOtpSent}
                        onChange={(e) => changeHandler('mobile', e.target.value)} />
                </div>
                {
                    isOtpSent && <div className="mb-3">
                        <label className="form-label">OTP</label>
                        <input
                            type="number"
                            className="form-control"
                            // value={data.otp || ''}
                            onChange={(e) => changeHandler('otp', e.target.value)} />
                    </div>
                }
                <button type="button" onClick={btnProps.btnHandler} className="btn btn-primary">{btnProps.btnText}</button>
            </div>
        </>
    )
}