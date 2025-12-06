import { useState } from "react";
import API from "../api";
import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [tenantName, setTenantName] = useState("");
  const [shopDomain, setShopDomain] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const validateShopifyDomain = (domain) => {
    domain = domain.trim().toLowerCase();
    domain = domain.replace("https://", "").replace("http://", "");

    if (!domain.endsWith(".myshopify.com")) {
      return {
        valid: false,
        message: "Shopify domain must end with .myshopify.com",
      };
    }

    const pattern = /^[a-z0-9][a-z0-9\-]*\.myshopify\.com$/;

    if (!pattern.test(domain)) {
      return { valid: false, message: "Invalid Shopify domain format" };
    }

    return { valid: true, message: "" };
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { valid, message } = validateShopifyDomain(shopDomain);
    if (!valid) {
      setError(message);
      return;
    }

    try {
      await API.post("/auth/signup", {
        tenantName,
        shopDomain: shopDomain.trim().toLowerCase(),
        accessToken,
        email,
        password,
      });

      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Signup failed. Please check your details.";
      setError(msg);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create store account</h1>
        <p className="auth-subtitle">
          Connect your Shopify store to start seeing insights.
        </p>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Store / Tenant name"
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Shopify domain (e.g. mystore.myshopify.com)"
            value={shopDomain}
            onChange={(e) => setShopDomain(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Shopify Admin API access token"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Set password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Create account</button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/">Log in</Link>
        </div>
      </div>
    </div>
  );
}
