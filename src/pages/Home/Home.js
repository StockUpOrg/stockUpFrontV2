import React, { useState, useEffect } from "react";
import StockChart from "./components/StockChart";
import StockData from "./components/StockData";
import CompoundInterestCalculator from "./components/CompoundInterestCalculator";
import StockNews from "./components/StockNews";
import StockPrediction from "./components/StockPrediction";
import StockInfo from "./components/StockInfo";

const stocks = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "GOOG", name: "Alphabet Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "FB", name: "Meta Platforms, Inc." },
  { symbol: "TSLA", name: "Tesla, Inc." },
  { symbol: "NVDA", name: "NVIDIA Corporation" },
  { symbol: "JPM", name: "JPMorgan Chase & Co." },
  { symbol: "JNJ", name: "Johnson & Johnson" },
  { symbol: "V", name: "Visa Inc." },
  // Additional Canadian stocks
  { symbol: "RY", name: "Royal Bank of Canada" },
  { symbol: "TD", name: "Toronto-Dominion Bank" },
  { symbol: "BNS", name: "Bank of Nova Scotia" },
  { symbol: "BMO", name: "Bank of Montreal" },
  { symbol: "CM", name: "Canadian Imperial Bank of Commerce" },
  { symbol: "TRP", name: "TC Energy Corporation" },
  { symbol: "ENB", name: "Enbridge Inc." },
  { symbol: "SHOP", name: "Shopify Inc." },
  { symbol: "AC", name: "Air Canada" },
  { symbol: "MG", name: "Magna International Inc." },
  // More Canadian stocks
  { symbol: "ATD", name: "Alimentation Couche-Tard Inc." },
  { symbol: "CNQ", name: "Canadian Natural Resources Limited" },
  { symbol: "SU", name: "Suncor Energy Inc." },
  { symbol: "CP", name: "Canadian Pacific Railway Limited" },
  { symbol: "IMO", name: "Imperial Oil Limited" },
  { symbol: "CVE", name: "Cenovus Energy Inc." },
  { symbol: "GOLD", name: "Barrick Gold Corporation" },
  { symbol: "TECK", name: "Teck Resources Limited" },
  { symbol: "RBA", name: "Ritchie Bros. Auctioneers Incorporated" },
  { symbol: "RCI", name: "Rogers Communications Inc." },
  // More Canadian stocks
  { symbol: "BCE", name: "BCE Inc." },
  { symbol: "POW", name: "Power Corporation of Canada" },
  { symbol: "PPL", name: "Pembina Pipeline Corporation" },
  { symbol: "FM", name: "First Quantum Minerals Ltd." },
  { symbol: "WPM", name: "Wheaton Precious Metals Corp." },
  { symbol: "CU", name: "Canadian Utilities Limited" },
  { symbol: "ECA", name: "Encana Corporation" },
  { symbol: "VRX", name: "Valeant Pharmaceuticals International, Inc." },
  { symbol: "BBD", name: "Bombardier Inc." },
  { symbol: "ENF", name: "Enbridge Income Fund Holdings Inc." },
  // Another batch of Canadian stocks
  { symbol: "CCO", name: "Cameco Corporation" },
  { symbol: "BB", name: "BlackBerry Limited" },
  { symbol: "CPG", name: "Crescent Point Energy Corp." },
  { symbol: "FTS", name: "Fortis Inc." },
  { symbol: "L", name: "Loblaw Companies Limited" },
  { symbol: "TRI", name: "Thomson Reuters Corporation" },
  { symbol: "SNC", name: "SNC-Lavalin Group Inc." },
  { symbol: "GWO", name: "Great-West Lifeco Inc." },
  { symbol: "CMG", name: "Chipotle Mexican Grill, Inc." },
  { symbol: "MFC", name: "Manulife Financial Corporation" },
  // Add more Canadian stocks, ETFs, or other entities here
  // Additional stocks
  { symbol: "NFLX", name: "Netflix, Inc." },
  { symbol: "DIS", name: "The Walt Disney Company" },
  { symbol: "PYPL", name: "PayPal Holdings, Inc." },
  { symbol: "BRK", name: "Berkshire Hathaway Inc." },
  { symbol: "INTC", name: "Intel Corporation" },
  { symbol: "T", name: "AT&T Inc." },
  { symbol: "IBM", name: "International Business Machines Corporation" },
  { symbol: "CSCO", name: "Cisco Systems, Inc." },
  { symbol: "PFE", name: "Pfizer Inc." },
  { symbol: "HD", name: "The Home Depot, Inc." },
  { symbol: "VZ", name: "Verizon Communications Inc." },
  { symbol: "PG", name: "Procter & Gamble Company" },
  { symbol: "MRK", name: "Merck & Co., Inc." },
  { symbol: "KO", name: "The Coca-Cola Company" },
  { symbol: "PEP", name: "PepsiCo, Inc." },
  { symbol: "BAC", name: "Bank of America Corporation" },
  { symbol: "XOM", name: "Exxon Mobil Corporation" },
  { symbol: "C", name: "Citigroup Inc." },
  { symbol: "CVX", name: "Chevron Corporation" },
  { symbol: "WMT", name: "Walmart Inc." },
  { symbol: "WFC", name: "Wells Fargo & Company" },
  { symbol: "ORCL", name: "Oracle Corporation" },
];

const Home = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [randomizedStocks, setRandomizedStocks] = useState([]);
  const [stockNews, setStockNews] = useState([]);
  const [stockInfo, setStockInfo] = useState(null);
  const [stockPrediction, setStockPrediction] = useState(null);

  const fetchData = async (query) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/stocks/${query}`);
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
        if (jsonData.symbol) {
          const newsResponse = await fetch(
            `http://127.0.0.1:8000/stock-news/${jsonData.symbol}`
          );
          if (newsResponse.ok) {
            const newsData = await newsResponse.json();
            setStockNews(newsData.stock_news);
          }
          const infoResponse = await fetch(
            `http://127.0.0.1:8000/stock-info/${jsonData.symbol}`
          );
          if (infoResponse.ok) {
            const infoData = await infoResponse.json();
            setStockInfo(infoData.stock_info);
          }
          const predictionResponse = await fetch(
            `http://127.0.0.1:8000/pre/${jsonData.symbol}`
          );
          if (predictionResponse.ok) {
            const predictionData = await predictionResponse.json();
            setStockPrediction(predictionData.result);
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
    fetchData(query);
  };

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
          <div
            id="tabs"
            className="bg-white w-full flex flex-col items-center justify-center mt-10 p-10"
          >
            <h1 className="text-3xl font-semibold mb-4">{data.name}</h1>
            <StockInfo stockInfo={stockInfo} />
            <StockChart data={data} />
            <StockData data={data} />
            <CompoundInterestCalculator />
            <StockNews stockNews={stockNews} />
            <StockPrediction stockPrediction={stockPrediction} />
          </div>
        ) : (
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
