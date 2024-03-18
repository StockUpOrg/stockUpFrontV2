import React from "react";

const StockInfo = ({ stockInfo }) => {
  const getColor = (value, goodThreshold, badThreshold) => {
    if (value >= goodThreshold) return "text-green-600";
    if (value <= badThreshold) return "text-red-600";
    return "";
  };

  return (
    <div id="info" className="w-full h-full">
      <h2 className="text-xl font-bold mb-4">Stock Info</h2>
      {stockInfo && (
        <div className="space-y-4">
          <table className="w-full table-fixed">
            <tbody>
              {stockInfo.address1 && (
                <tr>
                  <td className="font-semibold">Address</td>
                  <td>
                    {[
                      stockInfo.address1,
                      stockInfo.city,
                      stockInfo.state,
                      stockInfo.zip,
                      stockInfo.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </td>
                </tr>
              )}
              {stockInfo.phone && (
                <tr>
                  <td className="font-semibold">Phone</td>
                  <td>{stockInfo.phone}</td>
                </tr>
              )}
              {stockInfo.open && (
                <tr>
                  <td className="font-semibold">Market Open</td>
                  <td>{stockInfo.open}</td>
                </tr>
              )}
              {stockInfo.dayLow && stockInfo.dayHigh && (
                <tr>
                  <td className="font-semibold">Day's Range</td>
                  <td>
                    {stockInfo.dayLow} - {stockInfo.dayHigh}
                  </td>
                </tr>
              )}
              {stockInfo.volume && (
                <tr>
                  <td className="font-semibold">Volume</td>
                  <td>{stockInfo.volume.toLocaleString()}</td>
                </tr>
              )}
              {stockInfo.fiftyTwoWeekLow && stockInfo.fiftyTwoWeekHigh && (
                <tr>
                  <td className="font-semibold">52-Week Range</td>
                  <td>
                    {stockInfo.fiftyTwoWeekLow} - {stockInfo.fiftyTwoWeekHigh}
                  </td>
                </tr>
              )}
              {stockInfo.category && (
                <tr>
                  <td className="font-semibold">Category</td>
                  <td>{stockInfo.category}</td>
                </tr>
              )}
              {stockInfo.ytdReturn && (
                <tr>
                  <td className="font-semibold">Year-to-Date Return</td>
                  <td className={getColor(stockInfo.ytdReturn, 0.1, 0)}>
                    {(stockInfo.ytdReturn * 100).toFixed(2)}%
                  </td>
                </tr>
              )}
              {stockInfo.fullTimeEmployees && (
                <tr>
                  <td className="font-semibold">Full-Time Employees</td>
                  <td>{stockInfo.fullTimeEmployees.toLocaleString()}</td>
                </tr>
              )}
              {stockInfo.auditRisk && (
                <tr>
                  <td className="font-semibold">Audit Risk</td>
                  <td>{stockInfo.auditRisk}</td>
                </tr>
              )}
              {stockInfo.boardRisk && (
                <tr>
                  <td className="font-semibold">Board Risk</td>
                  <td>{stockInfo.boardRisk}</td>
                </tr>
              )}
              {stockInfo.currentPrice && (
                <tr>
                  <td className="font-semibold">Current Price</td>
                  <td
                    className={getColor(
                      stockInfo.currentPrice,
                      stockInfo.fiftyTwoWeekLow,
                      stockInfo.fiftyTwoWeekHigh
                    )}
                  >
                    ${stockInfo.currentPrice.toFixed(2)}
                  </td>
                </tr>
              )}
              {stockInfo.targetHighPrice && stockInfo.targetLowPrice && (
                <tr>
                  <td className="font-semibold">Target Price Range</td>
                  <td>
                    ${stockInfo.targetLowPrice.toFixed(2)} - $
                    {stockInfo.targetHighPrice.toFixed(2)}
                  </td>
                </tr>
              )}
              {stockInfo.recommendationKey && (
                <tr>
                  <td className="font-semibold">Analyst Recommendation</td>
                  <td>{stockInfo.recommendationKey}</td>
                </tr>
              )}
              {stockInfo.numberOfAnalystOpinions && (
                <tr>
                  <td className="font-semibold">Number of Analyst Opinions</td>
                  <td>{stockInfo.numberOfAnalystOpinions}</td>
                </tr>
              )}
              {stockInfo.beta && (
                <tr>
                  <td className="font-semibold">Beta</td>
                  <td className={getColor(stockInfo.beta, 1, 2)}>
                    {stockInfo.beta.toFixed(2)}
                  </td>
                </tr>
              )}
              {stockInfo.earningsQuarterlyGrowth && (
                <tr>
                  <td className="font-semibold">Earnings Quarterly Growth</td>
                  <td
                    className={getColor(
                      stockInfo.earningsQuarterlyGrowth,
                      0.1,
                      0
                    )}
                  >
                    {(stockInfo.earningsQuarterlyGrowth * 100).toFixed(2)}%
                  </td>
                </tr>
              )}
              {/* Additional fields can be added here */}
            </tbody>
          </table>
          <div>
            <h3 className="text-lg font-semibold">Company Information</h3>
            <p>{stockInfo.longBusinessSummary || "No summary available."}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockInfo;
