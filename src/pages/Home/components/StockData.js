import React from "react";

const StockData = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">Stock Data</h2>
      <div className="shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Open</th>
              <th className="px-4 py-2">Close</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data &&
              data.stock_data.slice(0, 15).map((entry, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{entry.date}</td>
                  <td className="px-4 py-2">{entry.open}</td>
                  <td className="px-4 py-2">{entry.close}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockData;
