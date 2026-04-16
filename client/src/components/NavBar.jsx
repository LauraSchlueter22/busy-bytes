import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🍽️ BusyBytes
        </Link>
        <ul className="nav-menu">
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Search Recipes
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/saved" className="nav-link">
                  Saved Recipes
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-user">🫶 {user.name}</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link nav-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
