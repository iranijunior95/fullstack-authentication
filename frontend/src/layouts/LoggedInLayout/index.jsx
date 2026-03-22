import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function LoggedInLayout() {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (user) {
        return <Navigate to="/profile" />;
    }

    return <Outlet />;
}