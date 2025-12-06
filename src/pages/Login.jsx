import { useState } from "react";
import API from "../api";
import { saveAuth } from "../auth";
import "../styles/auth.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      saveAuth(res.data.token, res.data.user, res.data.tenant);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Xeno Shopify Dashboard</h1>
        <p className="auth-subtitle">Sign in to view your store insights</p>

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Log in</button>
        </form>

        <div className="auth-footer">
          Don’t have an account? <Link to="/signup">Create account</Link>
        </div>
      </div>
    </div>
  );
}
