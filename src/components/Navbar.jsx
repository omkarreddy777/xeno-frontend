import { logout } from "../auth";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">Xeno Shopify Dashboard</span>
      </div>
      <div className="navbar-right">
        <button className="navbar-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
