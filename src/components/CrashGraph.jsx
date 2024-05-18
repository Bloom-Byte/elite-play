import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './CrashGame.css';

const CrashGraph = ({ gameState }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isCrashed, setIsCrashed] = useState(false);
  const [countDown, setCountDown] = useState(8);

  useEffect(() => {
    // Count down to next game
    if (isCrashed) {
      const interval = setInterval(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCountDown(8);
    }
  }, [isCrashed]);


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
            fill: false,
            borderColor: '#88DF95',
            borderWidth: 4,
            spanGaps: true,
            backgroundColor: 'transparent',
            title: {
              display: false,
              text: ''
            },
            tension: 0.4, // Optional: smooth the line
            pointRadius: function (context) {
              const index = context.dataIndex;
              const count = context.dataset.data.length;
              return index === count - 1 ? 10 : 0
            },
            pointBackgroundColor: function (context) {
              const index = context.dataIndex;
              const count = context.dataset.data.length;
              return index === count - 1 ? '#88DF95' : '#88DF95'; // Different color for the last point
            },
          }],
        },
        title: {
          display: false,
          text: ''
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                stepSize: 0.2,
              },
            },
            x: {
              type: 'linear',
              position: 'bottom',
              ticks: {
                stepSize: 2, // Ensure the x-axis increments by 1
              },
              beginAtZero: false,
            }
          },
          responsive: true,
          animation: {
            duration: 0, // Disable animation for smoother updates
          },
          plugins: {
            legend: {
              display: false, // Optional: hide legend if not needed
            },
          },
          maintainAspectRatio: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label;
              const value = context.parsed.y;
              // Display the current multiplier with a label
              return `${label}: ${value.toFixed(2)}x`;
            }
          }
        }
      });
    }

    // Check if game is crashed
    if (gameState.isGameCrashed) {
      setIsCrashed(true);
      // Reset chart data
      chartInstance.current.data.labels = [];
      chartInstance.current.data.datasets[0].data = [];
      // Update chart
      chartInstance.current.update();
    } else {
      setIsCrashed(false);
      // Update chart data
      const newDataIndex = chartInstance.current.data.labels.length;
      // chartInstance.current.data.labels.push(gameState.currentMultiplier);
      // chartInstance.current.data.datasets[0].data.push(newDataIndex.toString());
      chartInstance.current.data.labels.push((Math.log(newDataIndex).toFixed(3)).toString());
      chartInstance.current.data.datasets[0].data.push(gameState.currentMultiplier);
      // Update chart
      chartInstance.current.update();
    }
  }, [gameState]);

  return (
    <div style={{ position: 'relative', height: '350px' }}>
      {isCrashed ? (
        <p className='crashed-gamestate'>Crashed @ <br /> <span>{gameState.currentMultiplier}x</span> <br /> Waiting for next game to start in {countDown}s</p>
      ) : null}
      <canvas ref={chartRef} style={{ position: 'relative' }} />
      {isCrashed ? null : (
        <div className="current-multiplier">
          {gameState.currentMultiplier}x
        </div>
      )}
    </div>
  );
};

export default CrashGraph;