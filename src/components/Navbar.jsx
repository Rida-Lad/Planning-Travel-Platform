import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className={`px-6 py-4 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-black text-white' 
        : 'bg-white text-black'
    }`}>
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-yellow-500">MY-</span>SAFARI
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <a  className="hover:text-yellow-500 transition-colors">Home</a>
          <a  className="hover:text-yellow-500 transition-colors">About</a>
          <a  className="hover:text-yellow-500 transition-colors">Services</a>
          <a  className="hover:text-yellow-500 transition-colors">Contact</a>
        </div>
        
        {/* Desktop Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className={`hidden md:block px-4 py-2 rounded-md transition-colors ${
            theme === 'dark'
              ? 'bg-yellow-500 text-black hover:bg-yellow-600'
              : 'bg-yellow-500 text-black hover:bg-yellow-400'
          }`}
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden flex flex-col space-y-1 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${
            theme === 'dark' ? 'bg-white' : 'bg-black'
          } ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${
            theme === 'dark' ? 'bg-white' : 'bg-black'
          } ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${
            theme === 'dark' ? 'bg-white' : 'bg-black'
          } ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden mt-4 transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col space-y-4 pb-4">
          <a 
             
            className="hover:text-yellow-500 transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          <a 
             
            className="hover:text-yellow-500 transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a 
             
            className="hover:text-yellow-500 transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </a>
          <a 
             
            className="hover:text-yellow-500 transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
          
          <button 
            onClick={toggleTheme}
            className={`self-start px-4 py-2 rounded-md transition-colors mt-2 ${
              theme === 'dark'
                ? 'bg-yellow-500 text-black hover:bg-yellow-600'
                : 'bg-yellow-500 text-black hover:bg-yellow-400'
            }`}
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;