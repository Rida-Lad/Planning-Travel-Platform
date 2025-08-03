import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Costs from './pages/costs';
import FoodOptions from './pages/Foods';
import LodgingsOptions from './pages/Lodgings';
import ActivitiesOptions from './pages/Activities';

function App() {

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/costs" element= {<Costs/>} />
            <Route path="/foods" element={<FoodOptions />} />
            <Route path="/lodgings" element={<LodgingsOptions />} />
            <Route path="/activities" element={<ActivitiesOptions />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;




// import { useState } from "react";
// import axios from "axios";

// const DistanceCalculator = () => {
//   const [startCity, setStartCity] = useState("");
//   const [endCity, setEndCity] = useState("");
//   const [distance, setDistance] = useState(null);

//   const cities = ["Marrakech", "Tanger", "Rabat", "Casablanca", "Agadir"];

//   const calculateDistance = async () => {
//     if (startCity && endCity && startCity !== endCity) {
//       try {
//         const response = await axios.post("http://127.0.0.1:5000/get-distance", {
//           start_city: startCity,
//           end_city: endCity,
//         });
//         setDistance(response.data.distance_km);
//       } catch (error) {
//         alert("Error: " + error.response?.data?.error || "Server not responding");
//       }
//     } else {
//       alert("Please select two different cities.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
//       <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full max-w-md">
//         <h2 style={{fontFamily:'Merienda'}} className="text-2xl font-extrabold text-gray-800 text-center mb-8">
//           City Distance Calculator
//         </h2>

//         <div className="space-y-4">
//           <select
//             value={startCity}
//             onChange={(e) => setStartCity(e.target.value)}
//             className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
//           >
//             <option value="">Select Start City</option>
//             {cities.map((city) => (
//               <option key={city} value={city}>{city}</option>
//             ))}
//           </select>

//           <select
//             value={endCity}
//             onChange={(e) => setEndCity(e.target.value)}
//             className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
//           >
//             <option value="">Select Destination City</option>
//             {cities.map((city) => (
//               <option key={city} value={city}>{city}</option>
//             ))}
//           </select>

//           <button
//             onClick={calculateDistance}
//             className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
//           >
//             Calculate Distance
//           </button>
//         </div>

//         {distance && (
//           <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
//             <p className="text-center text-gray-700">
//               Distance between <span className="font-semibold text-blue-600">{startCity}</span> and <span className="font-semibold text-blue-600">{endCity}</span>:
//             </p>
//             <p className="text-center text-2xl font-bold text-green-600 mt-2">
//               {distance} km
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DistanceCalculator;
