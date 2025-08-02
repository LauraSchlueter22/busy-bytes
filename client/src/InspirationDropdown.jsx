import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InspirationDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        setIsOpen(false);
        navigate(path);
    };

    return (
        <div className="dropdown-container">
          <button onClick={() => setIsOpen(!isOpen)} className="inspiration-btn">
            Get Inspired ⌄
          </button>
          {isOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleNavigation('/30-minute-meals')}>30-Minute Meals</li>
              <li onClick={() => handleNavigation('/cuisine')}>Choose by Cuisine</li>
              <li onClick={() => handleNavigation('/random')}>Surprise me</li>
            </ul>
          )}
        </div>
      );
    };

    export default InspirationDropdown;