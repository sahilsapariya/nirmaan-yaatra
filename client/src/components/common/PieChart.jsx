import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ labels, datasets }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: labels,
        datasets: datasets,
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [datasets]);
  return (
    <div className="pie_chart">
      <canvas ref={chartRef} width={50} height={50}></canvas>
    </div>
  );
};

export default PieChart;
