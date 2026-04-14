import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ showLoginButton = true, user = null, onLogout = null }) {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navStyle = isScrolled 
    ? {
        backgroundColor: `rgba(${parseInt(theme.colors.surface.slice(1,3), 16)}, ${parseInt(theme.colors.surface.slice(3,5), 16)}, ${parseInt(theme.colors.surface.slice(5,7), 16)}, 0.7)`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }
    : { backgroundColor: 'transparent' };

  const underlineStyle = `
    .nav-link::after {
      background-color: ${theme.colors.primary} !important;
    }
  `;

  return (
    <>
      <style>{underlineStyle}</style>
      <nav 
        style={navStyle}
        className="sticky top-0 z-50 transition-all duration-300"
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <a href="/" className="text-lg font-bold transition hover:opacity-80" style={{ color: theme.colors.primary }}>
              <span className="font-bold" style={{ color: theme.colors.primary }}>Muhammad</span>
              <span className="font-bold" style={{ color: theme.colors.text }}> Fahad</span>
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
              onClick={toggleMobileMenu}
              className="p-2 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-inset transition-colors hover:bg-opacity-10"
              style={{ color: theme.colors.text }}
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
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}
        style={{ backgroundColor: isScrolled ? `rgba(${parseInt(theme.colors.surface.slice(1,3), 16)}, ${parseInt(theme.colors.surface.slice(3,5), 16)}, ${parseInt(theme.colors.surface.slice(5,7), 16)}, 0.7)` : 'transparent' }}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium transition" style={{ color: theme.colors.text }} >
            Home
            
          </a>
          <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium transition" style={{ color: theme.colors.text }}>
            About
          </a>
          <a href="#skills" className="block px-3 py-2 rounded-md text-base font-medium transition" style={{ color: theme.colors.text }}>
            Skills
          </a>
          <a href="#projects" className="block px-3 py-2 rounded-md text-base font-medium transition" style={{ color: theme.colors.text }}>
            Projects
          </a>
          <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium transition" style={{ color: theme.colors.text }}>
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