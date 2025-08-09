import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Search, MapPin, DollarSign } from 'lucide-react';
import axios from 'axios';

const ActivitiesOptions = () => {
  const { theme } = useTheme();
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [filters, setFilters] = useState({
    city: 'All Cities',
    cost: 'Any'
  });

  // Unique values for dropdowns
  const cities = ['All Cities', ...new Set(activities.map(a => a.city_name))];
  const costOptions = ['Any', 'Low (under 100)', 'Medium (100-250)', 'High (over 250)'];

  // Fetch data from API
  useEffect(() => {
    axios.get('http://localhost:5000/api/activity-options')
      .then(res => {
        setActivities(res.data);
        setFilteredActivities(res.data);
      })
      .catch(err => {
        console.error("Error fetching activity options:", err);
      });
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...activities];
    
    // City filter
    if (filters.city !== 'All Cities') {
      result = result.filter(item => item.city_name === filters.city);
    }
    
    // Cost filter
    if (filters.cost !== 'Any') {
      result = result.filter(item => {
        const [minStr, maxStr] = item.avg_cost.split('-');
        const min = parseInt(minStr);
        const max = maxStr ? parseInt(maxStr) : min;
        
        switch(filters.cost) {
          case 'Low (under 100)': return max < 100;
          case 'Medium (100-250)': return min >= 100 && max <= 250;
          case 'High (over 250)': return min > 250;
          default: return true;
        }
      });
    }
    
    setFilteredActivities(result);
    setDisplayCount(5); // Reset pagination on filter change
  }, [filters, activities]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const loadMore = () => {
    setDisplayCount(prev => prev + 5);
  };

  return (
    <section className={`py-16 px-4 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Popular <span className="text-yellow-500">Activities</span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover amazing activities and experiences across Morocco's vibrant cities for one adult
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
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                theme === 'dark'
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
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                theme === 'dark'
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

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-default">
          {filteredActivities.slice(0, displayCount).map(activity => (
            <div
              key={activity.id}
              className={`relative p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden ${
                theme === 'dark'
                  ? 'bg-gray-900 border border-gray-700 hover:border-yellow-500'
                  : 'bg-white border border-gray-200 hover:border-yellow-400'
              }`}
              style={{ 
                borderLeft: `4px solid ${activity.accent_color}`,
                backgroundColor: `${activity.accent_color}08`
              }}
            >
              <h3 className="text-2xl font-bold mb-3">{activity.activity_name}</h3>
              
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-gray-500" />
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {activity.city_name}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <DollarSign size={18} className="text-gray-500" />
                <span className="font-medium">
                  {activity.avg_cost} MAD
                </span>
              </div>
              
              <div 
                className="absolute bottom-0 right-0 w-16 h-16 -mr-4 -mb-4 rounded-full opacity-10"
                style={{ backgroundColor: activity.accent_color }}
              ></div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayCount < filteredActivities.length && (
          <div className="text-center mt-10">
            <button
              onClick={loadMore}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
              }`}
            >
              Load More Activities
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="inline-block p-4 mb-4 rounded-full bg-gray-200 text-gray-700">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-2">No Activities Found</h3>
            <p className="text-lg">
              Try adjusting your filters to find more options
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivitiesOptions; 