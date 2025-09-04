import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Collection() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get("http://194.164.149.179:5000/api/v1/category");
        console.log("Fetched collections:", response.data.categories);

        // Assuming API returns { categories: [...] }
        setCollections(response.data.categories);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <section className="py-17 bg-white">
      <h2 className="text-3xl font-medium text-center mb-13">
        SHOP BY COLLECTION
      </h2>

      {collections.length === 0 ? (
        <p className="text-center text-gray-500">Loading collections...</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {collections
            .filter((item) => item.name !== "All Products") // 👈 hide "All Product"
            .map((item, index) => (
              <Link
                to="/coming-soon"
                key={index}
                className="flex flex-col items-center text-center cursor-pointer"
              >
                <div className="w-40 h-40 rounded-full border-4 border-gray-300 flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="mt-2 text-gray-800 font-medium">{item.name}</p>
              </Link>
            ))}

        </div>
      )}
    </section>
  );
}
