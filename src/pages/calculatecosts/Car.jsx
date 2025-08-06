import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const CarCosts = () => {
    const { theme } = useTheme();
    const [form, setForm] = useState({
        start: '',
        end: '',
        roadType: 'nationalroad',
        fuelType: 'essence',
        fuelEfficiency: '',
        fuelPrice: ''
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        const defaultPrice = form.fuelType === 'essence' ? '13.03' : '12.00';
        setForm((prevForm) => ({
            ...prevForm,
            fuelPrice: defaultPrice,
        }));
    }, [form.fuelType]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/calculate-moto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        const data = await res.json();
        setResult(data);
    };

    const cities = [
        "Marrakech", "Agadir", "Tanger", "Fes", "Casablanca",
        "Rabat", "Essaouira", "Dakhla", "Tetouan"
    ];

    // Theme classes
    const containerClasses = ` p-6 md:p-12 transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'
        }`;

    const cardClasses = `rounded-xl shadow-lg p-6 md:p-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`;

    const inputClasses = `w-full p-3 rounded-lg border transition-colors ${theme === 'dark'
        ? 'bg-gray-700 border-gray-600 focus:border-yellow-500'
        : 'bg-gray-50 border-gray-300 focus:border-yellow-500'
        }`;

    const buttonClasses = `w-full py-3 px-6 rounded-lg font-semibold transition-colors ${theme === 'dark'
        ? 'bg-yellow-500 text-black hover:bg-yellow-600'
        : 'bg-yellow-500 text-black hover:bg-yellow-400'
        }`;

    return (
        <div className={containerClasses}>
            <div className="max-w-4xl mx-auto">
                <div className={cardClasses}>
                    <h2 className={`text-3xl font-bold mb-8 text-center border-b pb-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                        Car <span className="text-yellow-500">Cost Calculator</span>
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 font-medium">From:</label>
                                <select
                                    name="start"
                                    onChange={handleChange}
                                    className={inputClasses}
                                    required
                                >
                                    <option value=""> Select City</option>
                                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">To:</label>
                                <select
                                    name="end"
                                    onChange={handleChange}
                                    className={inputClasses}
                                    required
                                >
                                    <option value="">Select City</option>
                                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Road Type:</label>
                                <select
                                    name="roadType"
                                    onChange={handleChange}
                                    className={inputClasses}
                                >
                                    <option value="nationalroad">National Road</option>
                                    <option value="highway">Highway (Autoroute)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 font-medium">Fuel Type:</label>
                                <select
                                    name="fuelType"
                                    onChange={handleChange}
                                    className={inputClasses}
                                >
                                    <option value="essence">Essence</option>
                                    <option value="diesel">Diesel</option>
                                </select>
                            </div>


                            <div>
                                <label className="block mb-2 font-medium">
                                    Fuel Efficiency (km/l):
                                </label>
                                <input
                                    type="number"
                                    name="fuelEfficiency"
                                    step="0.1"
                                    min="1"
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder="e.g. 15.5"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Fuel Price (per liter):
                                </label>
                                <input
                                    type="number"
                                    name="fuelPrice"
                                    step="0.01"
                                    min="1"
                                    onChange={handleChange}
                                    defaultValue={form.fuelPrice}
                                    className={inputClasses}
                                />
                                <span className="text-sm text-gray-500">
                                    You can enter a custom price if needed.
                                </span>
                            </div>

                        </div>

                        <div className="md:col-span-2 pt-4">
                            <button type="submit" className={buttonClasses}>
                                Calculate Trip Cost
                            </button>
                        </div>
                    </form>
                </div>

                {result && (
                    <div className={`mt-8 ${cardClasses}`}>
                        <h3 className="text-2xl font-bold mb-4 text-center">
                            Trip <span className="text-yellow-500">Results</span>
                        </h3>

                        {/* Error Display */}
                        {result.error ? (
                            <div className={`p-4 rounded-lg text-center font-bold ${theme === 'dark'
                                ? 'bg-red-900 text-red-200'
                                : 'bg-red-100 text-red-700'
                                }`}>
                                {result.error}
                            </div>
                        ) : (
                            /* Normal Results Display */
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                                    }`}>
                                    <p className="text-lg font-semibold">Approximate Distance</p>
                                    <p className="text-3xl font-bold text-yellow-500">
                                        {result.distance_km} <span className="text-sm">km</span>
                                    </p>
                                </div>

                                <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                                    }`}>
                                    <p className="text-lg font-semibold">Fuel Needed</p>
                                    <p className="text-3xl font-bold text-yellow-500">
                                        {result.liters_needed} <span className="text-sm">liters</span>
                                    </p>
                                </div>

                                {/* New Toll Fee Display */}
                                <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                                    }`}>
                                    <p className="text-lg font-semibold">AVG Toll Fee</p>
                                    <p className="text-3xl font-bold text-yellow-500">
                                        {result.toll_fee} <span className="text-sm">MAD</span>
                                    </p>
                                </div>

                                <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                                    }`}>
                                    <p className="text-lg font-semibold">Approximate Total Cost</p>
                                    <p className="text-3xl font-bold text-yellow-500">
                                        {result.estimated_cost} <span className="text-sm">MAD</span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarCosts;