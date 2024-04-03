import React, { useState, useEffect } from "react";
import { addDays, format } from "date-fns";

const Prediction = () => {
  const [predictionData, setPredictionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.stockup-advanceproject.online/pre/hlit`
        );
        if (response.ok) {
          const predictionData = await response.json();
          setPredictionData(predictionData.result);
        } else {
          console.error("Failed to fetch prediction data");
        }
      } catch (error) {
        console.error("Error fetching prediction data:", error);
      }
    };

    fetchData();
  }, []);

  const generateDates = (start, count) => {
    const dates = [];
    let currentDate = start;
    for (let i = 0; i < count; i++) {
      dates.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }
    return dates;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow mx-auto">
        {predictionData ? (
          <div className="bg-gray-200 shadow-lg rounded-lg p-10 my-4">
            <div id="prediction" className="overflow-x-auto w-full mb-4">
              <h2 className="text-center font-bold mb-4">Stock Prediction</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Prediction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {predictionData.map((value, index) => (
                      <tr key={index} className="bg-gray-100">
                        <td className="px-4 py-2">
                          {format(addDays(new Date(), index), "MMM dd")}
                        </td>
                        <td className="px-4 py-2">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center animate-fade-in">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Prediction;
