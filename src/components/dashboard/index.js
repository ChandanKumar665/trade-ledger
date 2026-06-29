import Navbar from "../utils/Navbar";
import { useAuth } from "../../hooks/useAuth"
import { useNavigate, Navigate } from "react-router-dom";

export default function Dashboard(props) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/')
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }
    return <>
        <Navbar active_id='dbh' />
        <div>
            This is Dashboard
            <button className="btn btn-primary" onClick={handleLogout}>
                Logout
            </button>
        </div>
    </>
}