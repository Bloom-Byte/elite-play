import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const CrashGraph = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);


  useEffect(() => {
    if (!data || !data.length) {
      data = [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },{ value: 0 }, { value: 0 }, { value: 0 }]
    };

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
  
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default CrashGraph;
