import { useState } from "react";
import { motion } from "framer-motion";

const MedicineOverview = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const fetchMedicine = async () => {
        setError("");
        setResults([]);

        if (!query.trim()) {
            setError("Please enter a search term.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/search?query=${query}`);
            const data = await response.json();

            if (response.ok) {
                setResults(data);
            } else {
                setError(data.error || "No results found.");
            }
        } catch (err) {
            setError("Failed to fetch data. Please try again.");
        }
    };

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">🔍 Medicine Search</h2>

            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search by medicine, ingredient, usage, or side effect..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full max-w-2xl p-3 border rounded-lg shadow-sm"
                />
                <button onClick={fetchMedicine} className="ml-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition">
                    Search
                </button>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {results.length > 0 && (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {results.map((medicine, index) => (
                        <motion.div
                            key={index}
                            className="p-4 border rounded-lg shadow-md bg-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <h3 className="font-semibold text-xl text-blue-700">{medicine["Medicine Name"]}</h3>
                            <p><strong>Usage:</strong> {medicine.Usage}</p>
                            <p><strong>Expiry Date:</strong> {medicine["Expiry Date"]}</p>
                            <p><strong>Ingredients:</strong> {medicine["Active Ingredients"]}</p>
                            <p><strong>Side Effects:</strong> {medicine["Side Effects"]}</p>
                            <p><strong>Alternatives:</strong> {medicine.Alternatives}</p>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default MedicineOverview;