import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

const Home = () => {
  const [query, setQuery] = useState("hlit");
  const [data, setData] = useState(null);
  const [stockNews, setStockNews] = useState([]);
  const [stockInfo, setStockInfo] = useState(null);
  const [stockPrediction, setStockPrediction] = useState(null);
  const chartRef = useRef(null);
  const predictionChartRef = useRef(null);
  const principalRef = useRef(null);
  const yearsRef = useRef(null);

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

  useEffect(() => {
    fetchData(query);
  }, [query]);

  useEffect(() => {
    if (!data) return;

    const labels = data.stock_data.map((entry) => entry.date);
    const openData = data.stock_data.map((entry) => entry.open);
    const closeData = data.stock_data.map((entry) => entry.close);

    const ctx = chartRef.current.getContext("2d");

    const chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Open",
            data: openData,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 1,
            fill: false,
          },
          {
            label: "Close",
            data: closeData,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              displayFormats: {
                day: "MMM dd", // Use "MMM dd" instead of "MMM DD"
              },
            },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  useEffect(() => {
    if (!stockPrediction) return;

    const formattedPredictionData = stockPrediction.map((entry) => ({
      x: new Date(entry.date),
      y: entry.prediction,
    }));

    const ctx = predictionChartRef.current.getContext("2d");

    const predictionChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Prediction",
            data: formattedPredictionData,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              displayFormats: {
                day: "MMM dd", // Use "MMM dd" instead of "MMM DD"
              },
            },
          },
        },
      },
    });

    return () => {
      predictionChartInstance.destroy();
    };
  }, [stockPrediction]);

  const calculateCompoundInterest = () => {
    const principal = principalRef.current.value;
    const years = yearsRef.current.value;
    const rate = 0.04; // 4% interest rate
    const amount = principal * Math.pow(1 + rate, years);
    const interest = amount - principal;
    const result = `After ${years} years at 4% interest, the investment will be worth $${amount.toFixed(
      2
    )}, with an interest of $${interest.toFixed(2)}.`;
    document.getElementById("compoundInterestResult").innerText = result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchData(query);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <form onSubmit={handleSubmit} className="w-full max-w-screen-xl mx-auto">
        <div className="bg-gray-200 shadow-lg rounded-lg p-6">
          <div className="text-center">
            <label
              htmlFor="stock"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter Stock Symbol or Company Name
            </label>
            <input
              id="stock"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full sm:w-48 md:w-64 lg:w-96 border border-gray-300 p-2 rounded-md focus:outline-none focus:border-teal-500"
            />
          </div>
          <div className="text-center mt-4">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      <div className="flex-grow mx-auto">
        {data ? (
          <div className="bg-gray-200 shadow-lg rounded-lg p-10 my-4">
            <div
              id="resultCompany"
              className="w-full text-center italic font-bold mb-4"
            >
              The little details that matters the most
            </div>
            <div
              id="resultCompany"
              className="w-full text-center font-bold mb-4"
            >
              Symbol: {data?.symbol} | Company Name: {data?.company_name}
            </div>
            <br />
            <br />
            <div id="tabs" className="flex flex-col items-center">
              <div
                id="resultCompany"
                className="w-full text-center font-bold mb-4"
              >
                1 Year Open & Close Price
              </div>
              <div id="chart" className="w-full mb-4">
                <canvas ref={chartRef}></canvas>
              </div>
              <br />
              <br />
              <div id="table" className="overflow-x-auto w-full mb-4">
                <h2 className="text-center font-bold mb-4">Stock Data</h2>
                <table className="w-full bg-gray-800 text-white">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Open</th>
                      <th className="px-4 py-2">Close</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.stock_data.slice(0, 15).map((entry, index) => (
                        <tr key={index} className="bg-gray-200">
                          <td className="px-4 py-2 text-center text-black">
                            {entry.date}
                          </td>
                          <td className="px-4 py-2 text-center text-black">
                            {entry.open}
                          </td>
                          <td className="px-4 py-2 text-center text-black">
                            {entry.close}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <br />
              <br />
              <div id="calculator" className="overflow-x-auto w-full mb-4">
                <h2 className="text-center font-bold mb-4">
                  Compound Interest Calculator
                </h2>
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="principal"
                    className="text-gray-700 font-bold mb-2"
                  >
                    Principal Value:
                  </label>
                  <input
                    id="principal"
                    type="number"
                    ref={principalRef} // Assign ref to input element
                    className="w-full sm:w-48 md:w-64 lg:w-96 border border-gray-300 p-2 rounded-md focus:outline-none focus:border-teal-500"
                    placeholder="Enter principal value"
                  />

                  <label
                    htmlFor="years"
                    className="text-gray-700 font-bold mt-4 mb-2"
                  >
                    Number of Years:
                  </label>
                  <input
                    id="years"
                    type="number"
                    ref={yearsRef} // Assign ref to input element
                    className="w-full sm:w-48 md:w-64 lg:w-96 border border-gray-300 p-2 rounded-md focus:outline-none focus:border-teal-500"
                    placeholder="Enter number of years"
                  />

                  <button
                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
                    onClick={calculateCompoundInterest}
                  >
                    Calculate
                  </button>

                  <div
                    id="compoundInterestResult"
                    className="mt-4 text-center"
                  ></div>
                </div>
              </div>
              <br />
              <br />
              <div id="news" className="overflow-x-auto w-full mb-4">
                <h2 className="text-center font-bold mb-4">
                  Stock News and Analysis
                </h2>
                {stockNews.map((newsItem) => (
                  <div key={newsItem.uuid} className="my-4">
                    <h3 className="text-lg font-semibold">{newsItem.title}</h3>
                    <p className="text-sm text-gray-600">
                      {newsItem.publisher}
                    </p>
                    <a
                      href={newsItem.link}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                    </a>
                  </div>
                ))}
              </div>
              <br />
              <br />
              <div id="prediction" className="overflow-x-auto w-full mb-4">
                <h2 className="text-center font-bold mb-4">Stock Prediction</h2>
                {stockPrediction && (
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Prediction Results
                      </h3>
                    </div>
                    <div className="px-4 py-5 sm:px-6">
                      <canvas ref={predictionChartRef}></canvas>
                    </div>
                  </div>
                )}
              </div>
              <br />
              <br />
              <div id="info" className="overflow-x-auto w-full mb-4">
                <h2 className="text-center font-bold mb-4">Stock Info</h2>
                {stockInfo && (
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Company Information
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        {stockInfo.longBusinessSummary}
                      </p>
                    </div>
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Address
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {stockInfo.address1}, {stockInfo.city},{" "}
                            {stockInfo.state}, {stockInfo.zip},{" "}
                            {stockInfo.country}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                )}
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

export default Home;
