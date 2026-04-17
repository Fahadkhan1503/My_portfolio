import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ showLoginButton = true, user = null, onLogout = null }) {
  const { theme, isDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Close mobile menu when user scrolls
useEffect(() => {
  const handleScrollClose = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };
  window.addEventListener('scroll', handleScrollClose);
  return () => window.removeEventListener('scroll', handleScrollClose);
}, [isMobileMenuOpen]);
// Close mobile menu when clicking outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      isMobileMenuOpen &&
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target) &&
      menuButtonRef.current &&
      !menuButtonRef.current.contains(event.target)
    ) {
      setIsMobileMenuOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [isMobileMenuOpen]);

  const navStyle = isScrolled 
    ? {
        backgroundColor: `rgba(${parseInt(theme.colors.surface.slice(1,3), 16)}, ${parseInt(theme.colors.surface.slice(3,5), 16)}, ${parseInt(theme.colors.surface.slice(5,7), 16)}, 0.7)`,
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(10px)',
      }
    : { backgroundColor: 'transparent',
       backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
     };
     const handleMobileLinkClick = () => {
  setIsMobileMenuOpen(false);
};
  const navbarStyles = `
    .navbar-brand {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.5px;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .navbar-brand:hover {
      opacity: 0.8;
    }
    .nav-link {
      position: relative;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 0.3px;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      padding: 8px 0;
      display: inline-block;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: ${theme.colors.primary};
      transition: width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .nav-link:hover::after {
      width: 100%;
    }
    .nav-link:hover {
      color: ${theme.colors.primary};
    }
  `;

  return (
    <>
      <style>{navbarStyles}</style>
      <nav 
        style={{
          ...navStyle,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: isScrolled
      ? isDarkMode
        ? `0 10px 30px -5px #d3c5f640, 0 4px 10px -2px #d3c5f620`
        : `0 10px 30px -5px rgba(0, 0, 0, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.06)`
      : 'none',
          maxWidth: '100vw',          // prevent overflow
          overflowX: 'clip',          // clip any child overflow
        }}
        // className="sticky top-0 z-50"
        className="fixed top-0 left-0 right-0 w-full z-50"
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <a href="/" className="navbar-brand" style={{ color: theme.colors.primary }}>
              <span style={{ color: theme.colors.primary }}>Muhammad</span>
              <span style={{ color: theme.colors.text }}> Fahad</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <a  href="#hero"
                className="nav-link relative text-lg font-medium transition after:content-[''] after:absolute after:left-0 after-bottom-[-4px] after:w-0 after-h-[2px] after:transition-all after:duration-300 hover:after:w-full"
                style={{ color: theme.colors.text }}
                onMouseEnter={(e) => e.target.style.color = theme.colors.primary}
                onMouseLeave={(e) => e.target.style.color = theme.colors.text}
              >
                Home
              </a>
            <a href="#about" 
              className="nav-link relative text-lg font-medium transition after:content-[''] after:absolute after:left-0 after-bottom-[-4px] after:w-0 after-h-[2px] after:transition-all after:duration-300 hover:after:w-full"
              style={{ color: theme.colors.text }}
              onMouseEnter={(e) => e.target.style.color = theme.colors.primary}
              onMouseLeave={(e) => e.target.style.color = theme.colors.text}
            >
              About
            </a>
            <a href="#skills" 
              className="nav-link relative text-lg font-medium transition after:content-[''] after:absolute after:left-0 after-bottom-[-4px] after:w-0 after-h-[2px] after:transition-all after:duration-300 hover:after:w-full"
              style={{ color: theme.colors.text }}
              onMouseEnter={(e) => e.target.style.color = theme.colors.primary}
              onMouseLeave={(e) => e.target.style.color = theme.colors.text}
            >
              Skills
            </a>
            <a href="#projects" 
              className="nav-link relative text-lg font-medium transition after:content-[''] after:absolute after:left-0 after-bottom-[-4px] after:w-0 after-h-[2px] after:transition-all after:duration-300 hover:after:w-full"
              style={{ color: theme.colors.text }}
              onMouseEnter={(e) => e.target.style.color = theme.colors.primary}
              onMouseLeave={(e) => e.target.style.color = theme.colors.text}
            >
              Projects
            </a>
            <a href="#contact" 
              className="nav-link relative text-lg font-medium transition after:content-[''] after:absolute after:left-0 after-bottom-[-4px] after:w-0 after-h-[2px] after:transition-all after:duration-300 hover:after:w-full"
              style={{ color: theme.colors.text }}
              onMouseEnter={(e) => e.target.style.color = theme.colors.primary}
              onMouseLeave={(e) => e.target.style.color = theme.colors.text}
            >
              Contact
            </a>
            </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button */}
            <button
            ref={menuButtonRef}
              onClick={toggleMobileMenu}
              className="p-2 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-inset transition-colors hover:bg-opacity-10"
              style={{ color: theme.colors.primary }}
              aria-expanded={isMobileMenuOpen}
              
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div ref={mobileMenuRef} className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}
          style={{ 
            backgroundColor: `rgba(${parseInt(theme.colors.surface.slice(1,3), 16)}, ${parseInt(theme.colors.surface.slice(3,5), 16)}, ${parseInt(theme.colors.surface.slice(5,7), 16)}, 0.95)`,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            maxWidth: '100vw',           // ensure dropdown doesn't exceed viewport
            overflowX: 'hidden',         // hide any accidental overflow 
     }}>
        <div className="px-4 pt-2 pb-3 space-y-1">
          <a href="#home" onClick={handleMobileLinkClick} className="block px-3 py-2 rounded-md text-base font-medium transition" style={{ color: theme.colors.text }} >
            home            
          </a>
          <a href="#about" onClick={handleMobileLinkClick} className="block px-3 py-2 rounded-md text-base font-medium transition" style={{ color: theme.colors.text }}>
            About
          </a>
          <a href="#skills" onClick={handleMobileLinkClick} className="block px-3 py-2 rounded-md text-base font-medium transition" style={{ color: theme.colors.text }}>
            Skills
          </a>
          <a href="#projects" onClick={handleMobileLinkClick} className="block px-3 py-2 rounded-md text-base font-medium transition" style={{ color: theme.colors.text }}>
            Projects
          </a>
          <a href="#contact" onClick={handleMobileLinkClick} className="block px-3 py-2 rounded-md text-base font-medium transition" style={{ color: theme.colors.text }}>
            Contact
          </a>
          <div className="px-3 py-2 sm:hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}