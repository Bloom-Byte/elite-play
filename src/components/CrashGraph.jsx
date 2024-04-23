import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const CrashGraph = ({ gameState }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);


  useEffect(() => {
    if (!chartRef.current || !gameState) return;

    const ctx = chartRef.current.getContext('2d');

    if (!chartInstance.current) {
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Crash Multiplier',
            data: [],
            fill: true,
            borderColor: '#88DF95',
            borderWidth: 4,
            pointRadius: 0,
            backgroundColor: '#34B263'
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    // Update chart data
    const newDataIndex = chartInstance.current.data.labels.length;
    chartInstance.current.data.labels.push(newDataIndex.toString());
    chartInstance.current.data.datasets[0].data.push(gameState.currentMultiplier);

    // Limit chart data length to prevent it from growing indefinitely
    const maxDataLength = 10;
    if (chartInstance.current.data.labels.length > maxDataLength) {
      chartInstance.current.data.labels.shift();
      chartInstance.current.data.datasets[0].data.shift();
    }

    // Update chart
    chartInstance.current.update();

  }, [gameState]);

  return <canvas ref={chartRef} />;
};

export default CrashGraph;