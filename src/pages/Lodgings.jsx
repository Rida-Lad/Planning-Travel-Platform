import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Search, MapPin, DollarSign } from 'lucide-react';
import axios from 'axios';

const LodgingsOptions = () => {
  const { theme } = useTheme();
  const [lodgins, setLodgings] = useState([]);
  const [filteredLodgings, setFilteredLodgings] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [filters, setFilters] = useState({
    city: 'All Cities',
    cost: 'Any'
  });

  // Unique values for dropdowns
  const cities = ['All Cities', ...new Set(lodgins.map(a => a.city_name))];
  const costOptions = ['Any', 'Low (under 300)', 'Medium (300-650)', 'High (over 650)'];

  // Fetch data from API
  useEffect(() => {
    axios.get('http://localhost:5000/api/lodgings-options')
      .then(res => {
        setLodgings(res.data);
        setFilteredLodgings(res.data);
      })
      .catch(err => {
        console.error("Error fetching lodging options:", err);
      });
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...lodgins];

    // City filter
    if (filters.city !== 'All Cities') {
      result = result.filter(item => item.city_name === filters.city);
    }

    // Cost filter
    if (filters.cost !== 'Any') {
      result = result.filter(item => {
        const cost = item.cost_day; 

        switch (filters.cost) {
          case 'Low (under 300)': return cost < 300;
          case 'Medium (300-650)': return cost >= 300 && cost <= 650;
          case 'High (over 650)': return cost > 650;
          default: return true;
        }
      });
    }

    setFilteredLodgings(result);
    setDisplayCount(5); // Reset pagination on filter change
  }, [filters, lodgins]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const loadMore = () => {
    setDisplayCount(prev => prev + 5);
  };

  return (
    <section className={`py-16 px-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'
      }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Average <span className="text-yellow-500">Lodgings Costs</span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
            Discover amazing lodging options across Morocco's vibrant cities for one adult 
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <select
              name="city"
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-black'
                }`}
              value={filters.city}
              onChange={handleFilterChange}
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <select
              name="cost"
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-black'
                }`}
              value={filters.cost}
              onChange={handleFilterChange}
            >
              {costOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lodgings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-default">
          {filteredLodgings.slice(0, displayCount).map(lodging => (
            <div
              key={lodging.id}
              className={`relative p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden ${theme === 'dark'
                  ? 'bg-gray-900 border border-gray-700 hover:border-yellow-500'
                  : 'bg-white border border-gray-200 hover:border-yellow-400'
                }`}
              style={{
                borderLeft: `4px solid ${lodging.accent_color}`,
                backgroundColor: `${lodging.accent_color}08`
              }}
            >
              <h3 className="text-2xl font-bold mb-3">{lodging.lodging_name}</h3>

              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-gray-500" />
                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  {lodging.city_name}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <DollarSign size={18} className="text-gray-500" />
                <span className="font-medium">
                  {lodging.cost_day} MAD per night
                </span>
              </div>

              <div
                className="absolute bottom-0 right-0 w-16 h-16 -mr-4 -mb-4 rounded-full opacity-10"
                style={{ backgroundColor: lodging.accent_color }}
              ></div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayCount < filteredLodgings.length && (
          <div className="text-center mt-10">
            <button
              onClick={loadMore}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${theme === 'dark'
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                }`}
            >
              Load More Lodgings
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredLodgings.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="inline-block p-4 mb-4 rounded-full bg-gray-200 text-gray-700">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-2">No Lodgings Found</h3>
            <p className="text-lg">
              Try adjusting your filters to find more options
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LodgingsOptions; 