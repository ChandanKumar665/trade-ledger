import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../src/hooks/useAuth";

export default function ProtectedRoute() {
    const { user } = useAuth();
    return user
        ? <Outlet />
        : <Navigate to="/login" replace />;
}