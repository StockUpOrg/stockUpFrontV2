import React, { useState, useEffect } from "react";
import StockChart from "./components/StockChart";
import StockData from "./components/StockData";
import CompoundInterestCalculator from "./components/CompoundInterestCalculator";
import StockNews from "./components/StockNews";
import StockPrediction from "./components/StockPrediction";
import StockInfo from "./components/StockInfo";

import stocks from "../../assets/stockList";

const Home = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [stockNews, setStockNews] = useState([]);
  const [stockInfo, setStockInfo] = useState(null);
  const [stockPrediction, setStockPrediction] = useState(null);

  const domain = "https://api.stockup-advanceproject.online/";

  const fetchData = async (query) => {
    try {
      const response = await fetch(`${domain}stocks/${query}/`);
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
        // console.log(jsonData);
        if (jsonData.symbol) {
          const newsResponse = await fetch(
            `${domain}stock-news/${jsonData.symbol}/`
          );
          if (newsResponse.ok) {
            const newsData = await newsResponse.json();
            setStockNews(newsData.stock_news);
          }
          const infoResponse = await fetch(
            `${domain}stock-info/${jsonData.symbol}/`
          );
          if (infoResponse.ok) {
            const infoData = await infoResponse.json();
            setStockInfo(infoData.stock_info);
          }
          const predictionResponse = await fetch(
            `${domain}pre/${jsonData.symbol}/?days=365`
          );
          if (predictionResponse.ok) {
            const predictionData = await predictionResponse.json();
            setStockPrediction(predictionData);
            // console.log(predictionData);
          }
        }
      } else {
        console.error("Failed to fetch stock data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData(null); // Reset data when component mounts or query changes
    fetchData(query);
  };

  // Dompurify
  // const handleInputChange = (e) => {
  //   const sanitizedInput = DOMPurify.sanitize(e.target.value);
  //   setQuery(sanitizedInput);
  // };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter Stock Symbol or Company Name
            </label>
            <div className="relative">
              <input
                id="stock"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g. AAPL or Apple Inc."
              />
              <div className="absolute inset-y-0 left-1 pr-3 flex items-center pointer-events-none">
                <span className="animate-blink">|</span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        {data ? (
          // If stock data is available, display the stock data
          <div
            id="tabs"
            className="bg-white w-full flex flex-col items-center justify-center mt-10"
          >
            <div
              id="banner"
              className="animate-text bg-gradient-to-r from-blue-500 to-purple-600 w-full p-10 flex justify-between items-center"
              aria-label="Stock information banner"
            >
              <div className="text-white" aria-label="Company details">
                <h2
                  className="text-xl font-bold mb-2"
                  aria-label="Company name"
                >
                  {stockInfo?.longName || "Company Name"}
                </h2>
                <p className="mb-2" aria-label="Stock symbol">
                  ({data?.symbol || "TSLA"})
                </p>
                <a
                  href={stockInfo?.website || "#"}
                  className="underline mb-2"
                  aria-label="Company website link"
                >
                  {stockInfo?.website || "Not available"}
                </a>
              </div>
              <div
                className="text-white text-right"
                aria-label="Stock trading data"
              >
                <p
                  className="text-2xl font-bold"
                  aria-label="Current stock price"
                >
                  ${stockInfo?.currentPrice.toFixed(2) || "0.00"}
                  <span
                    className="text-green-300"
                    aria-label="Price change and percentage increase"
                  >
                    +${stockInfo?.dayHigh.toFixed(2) || "0.00"} (+
                    {(
                      (stockInfo?.dayHigh / stockInfo?.previousClose - 1) *
                      100
                    ).toFixed(2) || "0.00"}
                    %)
                  </span>
                </p>
                <p aria-label="Bid price and size">
                  Bid: ${stockInfo?.bid.toFixed(2) || "0.00"} x{" "}
                  {stockInfo?.bidSize || "0"}
                </p>
                <p aria-label="Ask price and size">
                  Ask: ${stockInfo?.ask.toFixed(2) || "0.00"} x{" "}
                  {stockInfo?.askSize || "0"}
                </p>
                <p aria-label="Daily trading volume">
                  Volume: {stockInfo?.volume.toLocaleString() || "0"}
                </p>
                <p aria-label="Last update time">
                  Updated at:{" "}
                  {new Date(stockInfo?.dateShortInterest * 1000).toLocaleString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                      timeZoneName: "short",
                      timeZone: "America/New_York",
                    }
                  ) || "Time unavailable"}
                </p>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-10">
              <div className="md:col-span-1 lg:col-span-1">
                <StockInfo stockInfo={stockInfo} />
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <StockPrediction
                  stockPrediction={stockPrediction}
                  stockData={data}
                />
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <CompoundInterestCalculator stockInfo={stockInfo} />
                <StockChart data={data} />
                <StockData data={data} />
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <StockNews stockNews={stockNews} />
              </div>
              <div className="md:col-span-2 lg:col-span-1"></div>
              <div className="md:col-span-2 lg:col-span-1"></div>
            </div>
          </div>
        ) : (
          // If no stock data is available, display the stock list
          <div className="w-full flex flex-col items-center justify-center mt-10 p-10">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 font-extrabold text-4xl md:text-6xl lg:text-8xl animate-text mb-4">
              StockUP
            </h1>
            <p className="text-white text-lg font-semibold mb-2">
              Navigating the Complexity
            </p>
            <p className="text-gray-300 text-base">
              Simplifying stock data for beginners
            </p>
            <div className="flex justify-center items-start mt-10 p-10 overflow-hidden">
              <div className="relative w-full">
                <div className="slide">
                  {stocks.map((stock, index) => (
                    <div
                      key={stock.symbol}
                      className="bg-gray-900 rounded-md p-4 text-gray-400 text-m text-center hover:bg-gray-700 cursor-pointer transition duration-300 ease-in-out h-24 flex justify-center items-center"
                      onClick={() => {
                        setQuery(stock.symbol);
                        fetchData(stock.symbol);
                      }}
                    >
                      {stock.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
