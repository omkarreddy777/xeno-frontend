import { Navigate } from "react-router-dom";

function isTokenValid(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const payload = parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const decoded = JSON.parse(atob(payload));

    if (!decoded.exp) return true;

    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
}

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token || !isTokenValid(token)) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  return children;
}
