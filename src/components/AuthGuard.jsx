import { Navigate } from "react-router-dom";

function AuthGuard({ children }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn ? children : <Navigate to="/admin/login" replace />;
}

export default AuthGuard;
