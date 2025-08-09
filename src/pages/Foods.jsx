import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Pizza, Coffee, UtensilsCrossed, Search } from 'lucide-react';
import axios from 'axios';

const FoodOptions = () => {
  const { theme } = useTheme();
  const [foodData, setFoodData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/food-options')
      .then(res => {
        const transformed = res.data.map(item => ({
          id: item.id,
          city: item.city_name,
          breakfast: item.breakfast_cost,
          lunch: item.lunch_cost,
          dinner: item.dinner_cost,
        }));
        setFoodData(transformed);
        setFilteredData(transformed);
      })
      .catch(err => {
        console.error("Error fetching food options:", err);
      });
  }, []);

  useEffect(() => {
    const filtered = foodData.filter(item =>
      item.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, foodData]);

  return (
    <section className={`py-16 px-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'
      }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Average <span className="text-yellow-500">Food Costs</span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
            Explore estimated food costs (breakfast, lunch, dinner) across the cities of Morocco for one person.
          </p>
        </div>

        <div className="relative max-w-md mx-auto mb-12">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by city name..."
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-black'
              }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 cursor-default">
          {filteredData.length > 0 ? (
            filteredData.map(({ id, city, breakfast, lunch, dinner }) => (
              <div
                key={id}
                className={`relative p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden ${theme === 'dark'
                    ? 'bg-gray-900 border border-gray-700 hover:border-yellow-500'
                    : 'bg-white border border-gray-200 hover:border-yellow-400'
                  }`}
              >
                {/* City name with accent underline */}
                <h3 className="text-2xl font-bold mb-4 relative inline-block">
                  {city}
                  <span className={`absolute bottom-0 left-0 w-full h-1 ${theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-400'
                    }`} style={{ transform: 'scaleX(0.8)' }}></span>
                </h3>

                {/* Meal items container */}
                <div className="space-y-4 mt-6">
                  {/* Breakfast */}
                  <div className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 hover:bg-opacity-10 hover:bg-yellow-500">
                    <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-yellow-500 bg-opacity-20' : 'bg-yellow-100'
                      }`}>
                      <Coffee size={20}/>
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>Breakfast</p>
                      <p className="font-medium">{breakfast} MAD</p>
                    </div>
                  </div>

                  {/* Lunch */}
                  <div className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 hover:bg-opacity-10 hover:bg-yellow-500">
                    <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-yellow-500 bg-opacity-20' : 'bg-yellow-100'
                      }`}>
                      <UtensilsCrossed size={20}  />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>Lunch</p>
                      <p className="font-medium">{lunch} MAD</p>
                    </div>
                  </div>

                  {/* Dinner */}
                  <div className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 hover:bg-opacity-10 hover:bg-yellow-500">
                    <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-yellow-500 bg-opacity-20' : 'bg-yellow-100'
                      }`}>
                      <Pizza size={20} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>Dinner</p>
                      <p className="font-medium">{dinner} MAD</p>
                    </div>
                  </div>
                </div>

                {/* Subtle corner accent */}
                <div className={`absolute top-0 right-0 w-16 h-16 -mr-6 -mt-6 rounded-full ${theme === 'dark' ? 'bg-yellow-500 bg-opacity-10' : 'bg-yellow-100'
                  }`}></div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg">No cities found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FoodOptions;