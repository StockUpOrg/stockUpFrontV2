import React from "react";

const StockData = ({ data }) => {
  return (
    <div id="table">
      <h2>Stock Data</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>Close</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.stock_data.slice(0, 15).map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.open}</td>
                <td>{entry.close}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockData;
