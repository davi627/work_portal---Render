import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset isButtonClicked to false whenever the location changes
    setIsButtonClicked(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Adjust the value as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const shouldShowNavItems = location.pathname === '/';

  return (
    <nav className={`container ${isScrolled ? 'scrolled' : ''}`}>
      {shouldShowNavItems && !isButtonClicked && (
        <>
          <ul>
            <li>
              <Link to="#home" onClick={() => scrollToSection('home')}>
                Home
              </Link>
            </li>
            <li>
              <Link to="#about" onClick={() => scrollToSection('about')}>
                About
              </Link>
            </li>
            <li>
              <Link to="#contact" onClick={() => scrollToSection('contact')}>
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="#testimonials"
                onClick={() => scrollToSection('testimonials')}
              >
                Testimonials
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <button onClick={handleButtonClick}>
                <Link to="/worker">apply</Link>
              </button>
            </li>
            <li>
              <button onClick={handleButtonClick}>
                <Link to="/employer">post job</Link>
              </button>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Navbar;
