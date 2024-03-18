import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

const StockPrediction = ({ stockPrediction, stockData }) => {
  const [lastForecastValue, setLastForecastValue] = useState(null);
  const [change, setChange] = useState(null);
  const [changePercentage, setChangePercentage] = useState(null);
  const [todayValue, setTodayValue] = useState(null); // Define todayValue state

  const chartRef = useRef(null);

  useEffect(() => {
    console.log("Effect run: stockPrediction", stockPrediction);
    if (
      !stockPrediction ||
      !stockPrediction.result ||
      !stockData.stock_data ||
      stockData.stock_data.length === 0
    ) {
      console.log("No stock prediction or stock data available");
      return;
    }

    const formattedPredictionData = stockPrediction.result.map(
      ([date, prediction]) => ({
        x: new Date(date),
        y: prediction,
      })
    );

    const firstStockData = stockData.stock_data[0];
    const todayValue = (firstStockData.open + firstStockData.close) / 2;
    setTodayValue(todayValue); // Set todayValue state

    const firstPredictionDate = new Date(stockPrediction.result[0][0]);
    const sevenDaysBefore = new Date(
      firstPredictionDate.getTime() - 7 * 24 * 60 * 60 * 1000
    );

    const historicalData = stockData.stock_data
      .filter(
        (data) =>
          new Date(data.date) >= sevenDaysBefore &&
          new Date(data.date) < firstPredictionDate
      )
      .map((data) => ({
        x: new Date(data.date),
        y: (data.open + data.close) / 2,
      }));

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const canvas = document.getElementById("predictionChart");
    if (!canvas) {
      console.log("Failed to get canvas element");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.log("Failed to get canvas context");
      return;
    }

    const lastForecastValue =
      stockPrediction.result[stockPrediction.result.length - 1][1];
    const lastForecastDate =
      stockPrediction.result[stockPrediction.result.length - 1][0];
    const change = lastForecastValue - todayValue;
    const changePercentage = (change / todayValue) * 100;

    setLastForecastValue(lastForecastValue);
    setChange(change);
    setChangePercentage(changePercentage);

    const chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Historical Data",
            data: historicalData,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 1,
            fill: false,
          },
          {
            label: "Prediction",
            data: formattedPredictionData,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 1,
            borderDash: [5, 5],
            fill: false,
          },
          {
            label: "Today's Value",
            data: [{ x: new Date(), y: todayValue }],
            borderColor: "rgba(255, 0, 0, 1)",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: `Stock Prediction (Last Forecast: ${lastForecastValue} on ${lastForecastDate})`,
          },
        },
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              displayFormats: {
                day: "MMM dd",
              },
            },
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            title: {
              display: true,
              text: "Stock Value",
            },
          },
        },
      },
    });

    chartRef.current = chartInstance;

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [stockPrediction, stockData]);

  return (
    <div id="prediction" style={{ width: "100%", height: "500px" }}>
      <h2 className="text-xl font-bold mb-4">Stock Info</h2>
      {stockPrediction && stockPrediction.result ? (
        <div style={{ width: "100%", height: "100%" }}>
          <h3>Prediction Results</h3>
          <p>
            <strong>Forecast for 30 days:</strong>{" "}
            <span
              style={{
                color: change > 0 ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {change > 0 ? "+" : ""}
              {change?.toFixed(2)} ({changePercentage?.toFixed(2)}%)
            </span>
          </p>
          <p>
            <strong>Today's Value:</strong>{" "}
            <span
              style={{
                color: todayValue >= 0 ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {todayValue}
            </span>
          </p>
          <canvas
            id="predictionChart"
            style={{ width: "100%", height: "100%" }}
          ></canvas>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default StockPrediction;
