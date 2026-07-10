import Navbar from "../utils/Navbar";
import { useAuth } from "../../hooks/useAuth"
import { useNavigate, Navigate } from "react-router-dom";

export default function Accounts() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    console.log(user)
    return <>
        <Navbar active_id='acc' />
        <div>This is account</div>
    </>

}