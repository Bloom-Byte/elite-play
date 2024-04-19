import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const CrashGraph = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);


  useEffect(() => {
    if (!data || !data.length) return;

    const labels = data.map((item, index) => index.toString());
    const values = data.map(item => item.value);

    const ctx = chartRef.current.getContext('2d');

    if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Crash Multiplier',
            data: values,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            pointRadius: 0
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
  
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default CrashGraph;
