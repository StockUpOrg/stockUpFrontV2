import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

const StockPrediction = ({ stockPrediction }) => {
  const predictionChartRef = useRef(null);

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
                day: "MMM dd",
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

  return (
    <div id="prediction">
      <h2>Stock Prediction</h2>
      {stockPrediction && (
        <div>
          <div>
            <h3>Prediction Results</h3>
          </div>
          <div>
            <canvas ref={predictionChartRef}></canvas>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockPrediction;
