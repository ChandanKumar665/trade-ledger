import { Navigate } from "react-router-dom";
import { useAuth } from "../src/hooks/useAuth";

export default function PublicRoute({ children }) {
    const { user } = useAuth();
    return user
        ? <Navigate to="/dashboard" replace />
        : children;
}