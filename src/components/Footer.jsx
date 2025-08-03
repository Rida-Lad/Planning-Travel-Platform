import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`py-12 px-6 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-black text-white border-t border-gray-800' 
        : 'bg-white text-black border-t border-gray-200'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold mb-4">
              <span className="text-yellow-500">MY-</span>SAFARI
            </div>
            <p className={`text-sm leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
                Your trusted travel companion for unforgettable adventures. Explore, discover, and enjoy the journey with us.
            </p>
          </div>
          
          {/* Services Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className={`space-y-2 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>Costs of travel</li>
              <li>Lodging options</li>
              <li>Trips and activities</li>
            </ul>
          </div>
          
          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className={`space-y-2 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>
          
          {/* Support Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className={`space-y-2 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>Help Center</li>
              <li>Documentation</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className={`mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className={`text-sm mb-4 md:mb-0 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            © 2025  MY-SAFARI. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors cursor-pointer`}>
              <span className="text-sm font-bold">f</span>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors cursor-pointer`}>
              <span className="text-sm font-bold">t</span>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors cursor-pointer`}>
              <span className="text-sm font-bold">in</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;