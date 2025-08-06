import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Bus } from 'lucide-react';
import axios from 'axios';

const BusesOptions = () => {
  const { theme } = useTheme();
  const [selectedCity, setSelectedCity] = useState('Marrakech'); // default
  const [options, setOptions] = useState([]);

  // Load default city (Marrakech) on first render
  useEffect(() => {
    fetchData('Marrakech');
  }, []);

  const fetchData = (city) => {
    axios.get(`http://localhost:5000/api/bus-options`, {
      params: { end_city: city }
    })
      .then(response => {
        const transformed = response.data.map(item => ({
          id: item.id,
          title: `${item.start_city} → ${item.end_city}`,
          subtitle: `Cost: ${item.average_cost} MAD - Time: ${item.approx_time}`,
          route: null
        }));
        setOptions(transformed);
      })
      .catch(err => {
        console.error("Error fetching travel options:", err);
      });
  };

  return (
    <section className={`py-16 px-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'
      }`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Travel <span className="text-yellow-500">BusesOptions</span>
          </h2>
        </div>

        {/* Select + Button */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className={`px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition
            ${theme === 'dark'
                ? 'bg-black text-white border-gray-600 placeholder-gray-400'
                : 'bg-white text-black border-gray-300 placeholder-gray-500'
              }`
            }>
            <option value="Marrakech">Marrakech</option>
            <option value="Rabat">Rabat</option>
            <option value="Tanger">Tanger</option>
            <option value="Casablanca">Casablanca</option>
            <option value="Fes">Fes</option>
            <option value="Agadir">Agadir</option>
          </select>

          <button
            onClick={() => fetchData(selectedCity)}
            className="px-6 py-2 rounded-md bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition"
          >
            Show Options
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 cursor-pointer">
          {options.map((option) => {
            return (
              <div
                key={option.id}
                className={`relative p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-amber-300 ${theme === 'dark' ? 'bg-black shadow-sm shadow-white' : 'bg-white'
                  }`}
              >
                {/* Icon in top right corner */}
                <div className={`absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-400'
                  }`}>
                  <Bus size={20} className="text-black" />
                </div>

                {/* Content */}
                <div className="pr-14">
                  <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                  <p className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                    }`}>
                    {option.subtitle}
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

export default BusesOptions;
