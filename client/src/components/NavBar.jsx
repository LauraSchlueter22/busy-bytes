import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                🥘 BusyBytes
                </Link>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                        🔍Search Recipes
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/saved" className="nav-link">
                        Saved Recipes
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;