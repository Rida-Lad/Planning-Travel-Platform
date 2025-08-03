import { useTheme } from '../context/ThemeContext';
import { Clock } from 'lucide-react';

const LodgingsOptions = () => {
  const { theme } = useTheme();
  
  return (
    <section className={` flex flex-col items-center justify-center px-4 py-12 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-black text-white' 
        : 'bg-gray-100 text-black'
    }`}>
      <div className="text-center max-w-2xl mx-auto">
        {/* Icon */}
        <div className={`w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center ${
          theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-400'
        }`}>
          <Clock size={40} className="text-black" />
        </div>
        
        {/* Main Message */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Coming <span className="text-yellow-500">Soon</span>
        </h1>
        
        {/* Subtitle */}
        <p className={`text-lg sm:text-xl md:text-2xl mb-8 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          We're working hard to bring you something amazing. Stay tuned!
        </p>
        
        {/* Additional Message */}
        <p className={`text-sm sm:text-base ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          This page is under construction and will be available soon.
        </p>
      </div>
    </section>
  );
};

export default LodgingsOptions;