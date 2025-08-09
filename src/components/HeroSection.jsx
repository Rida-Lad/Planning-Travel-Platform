import { useTheme } from '../context/ThemeContext';
import {useNavigate} from 'react-router-dom';
import { CircleDollarSign , UtensilsCrossed , House, Activity    } from 'lucide-react';

const HeroSection = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const sercives = [
    {
      id: 1,
      title: "Know Your Costs",
      description: "Calculate travel costs between cities with ease and accuracy.",
      icon: CircleDollarSign ,
      route: '/costs'
    },
    {
      id: 2,
      title: "Discover lodging options",
      description: "Find the best lodging options for your travel needs, ensuring comfort and convenience.",
      icon: House,
      route: '/lodgings'
    },
    {
      id: 3,
      title: "Discover food options",
      description: "Explore various food options available in different cities to enhance your travel experience.",
      icon: UtensilsCrossed,
      route: '/foods'
    },
    {
      id: 4,
      title: "Search for tours and activities",
      description: "Explore various tours and activities to make your travel experience unforgettable.",
      icon: Activity, 
      route: '/activities'
    }
  ];
  
  return (
    <section className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-black text-white' 
        : 'bg-white text-black'
    }`}>
      <div className="text-center max-w-4xl mx-auto">
        <h1 style={{fontFamily:'Merienda'}} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Welcome to <span className="text-yellow-500">MYSAFARI</span>
        </h1>
        
        <p className="mb-8 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          Your one-stop solution for all travel needs. Calculate costs, find lodging, and discover exciting tours and activities with ease. Whether you're planning a short getaway or a long adventure, we've got you covered.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          <button className={`w-[200px] sm:w-auto px-6 py-3 rounded-lg font-semibold transition-colors ${
            theme === 'dark'
              ? 'bg-yellow-500 text-black hover:bg-yellow-600'
              : 'bg-yellow-500 text-black hover:bg-yellow-400'
          }`}>
            Get Started
          </button>
          
          <button className={`w-[200px] sm:w-auto px-6 py-3 rounded-lg font-semibold border-2 transition-colors ${
            theme === 'dark'
              ? 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black'
              : 'border-yellow-500 text-yellow-700 hover:bg-yellow-500 hover:text-black'
          }`}>
            Learn More
          </button>
        </div>
      </div>
      
      <div className={`w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 rounded-xl ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 cursor-pointer">
          {sercives.map((service) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.id} 
                onClick={() => service.route && navigate(service.route)}
                className={`p-4 sm:p-6 rounded-4xl transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-black-700 shadow-2xs shadow-white' : 'bg-white shadow-lg'
                }`}
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                  theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-400'
                }`}>
                  <IconComponent 
                    size={24} 
                    className="text-black sm:w-8 sm:h-8" 
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-center leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;