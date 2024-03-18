import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

const StockChart = ({ data }) => {
  const chartRef = useRef(null);

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
                day: "MMM dd",
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

  return (
    <div>
      <div id="resultCompany">1 Year Open & Close Price</div>
      <div id="chart">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default StockChart;
