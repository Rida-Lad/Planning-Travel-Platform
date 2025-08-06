import { useTheme } from '../context/ThemeContext';
import { Bike , Car , Bus , TramFront , Plane  } from 'lucide-react';
import {useNavigate} from 'react-router-dom';

const Costs = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const services = [
    {
      id: 1,
      title: "Travel with Motorcycle",
      subtitle: "Incredible Journeys",
      icon: Bike,
      route: "/costs/motorcycle"
    },
    {
      id: 2,
      title: "Travel with Car",
      subtitle: "Comfortable Rides",
      icon: Car,
      route:"/costs/car"
    },
    {
      id: 3,
      title: "Travel with Bus",
      subtitle: "Affordable Options",
      icon: Bus,
      route: "/costs/bus"
    },
    {
      id: 4,
      title: "Travel with Train",
      subtitle: "Scenic Routes",
      icon: TramFront 
    },
    {
      id: 5,
      title: "Travel with Plane",
      subtitle: "Fast Connections",
      icon: Plane 
    }
  ];
  
  return (
    <section className={`py-16 px-4 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-black text-white' 
        : 'bg-gray-50 text-black'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Calculate <span className="text-yellow-500">Travel Costs</span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Use our cost calculator to estimate your travel expenses and plan your budget effectively.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 cursor-pointer">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.id} 
                onClick={() => service.route && navigate(service.route)}
                className={`relative p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-amber-300 ${
                  theme === 'dark' ? 'bg-black shadow-sm shadow-white' : 'bg-white'
                }`}
              >
                {/* Icon in top right corner */}
                <div className={`absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center ${
                  theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-400'
                }`}>
                  <IconComponent 
                    size={20} 
                    className="text-black" 
                  />
                </div>
                
                {/* Content */}
                <div className="pr-14">
                  <h3 className="text-xl font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className={`text-sm font-medium mb-3 ${
                    theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                  }`}>
                    {service.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Costs;