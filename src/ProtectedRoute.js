import { Navigate } from "react-router-dom";
import { useAuth } from "../src/hooks/useAuth";

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();
    console.log('protected user', user);
    return user
        ? children
        : <Navigate to="/login" replace />;
}