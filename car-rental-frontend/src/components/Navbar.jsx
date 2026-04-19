import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../CSS/Navbar.css";

function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/vehicles", label: "Vehicles" },
    { path: "/my-rentals", label: "My Rentals" },

      ...(user?.role === "admin"
    ? [
        { path: "/admin/vehicles", label: "Admin Vehicles" },
        { path: "/admin/locations", label: "Locations" },
        { path: "/admin/types", label: "Vehicle Types" },
      ]
    : []),
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div
          className="navbar-logo"
          onClick={() => navigate("/vehicles")}
          role="button"
          tabIndex={0}
        >
          <svg
            className="logo-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 8h1a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V12a4 4 0 0 1 4-4h1M9 5a4 4 0 0 1 4-4 4 4 0 0 1 4 4" />
            <circle cx="9" cy="17" r="2" />
            <circle cx="15" cy="17" r="2" />
          </svg>
          <span className="logo-text">RentX</span>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-menu desktop-menu">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`nav-link ${isActive(link.path) ? "active" : ""}`}
            >
              {link.label}
              {isActive(link.path) && <span className="active-indicator"></span>}
            </button>
          ))}
        </div>

        {/* User Section */}
        <div className="navbar-user-section">
          {/* Profile */}
          <div className="user-profile">
            <div className="avatar">
              <span>{user?.name?.[0]?.toUpperCase() || "U"}</span>
            </div>
            <div className="user-info">
              <p className="user-name">{user?.name || "User"}</p>
              <p className="user-email">{user?.email || "user@rentx.com"}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button className="logout-btn" onClick={handleLogout}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5m0 0l-5-5" />
            </svg>
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-btn ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                navigate(link.path);
                setIsMenuOpen(false);
              }}
              className={`mobile-nav-link ${isActive(link.path) ? "active" : ""}`}
            >
              {link.label}
            </button>
          ))}
          <button className="mobile-logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>
      )}
    </nav>
  );
}

export default Navbar;
