import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './CrashGame.css';

const CrashGraph = ({ gameState }) => { 
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isCrashed, setIsCrashed] = useState(false);


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
              beginAtZero: false
            }
          }
        }
      });
    }

 // Check if game is crashed
 console.log(gameState)


 if (gameState.isGameRunning) {
  setIsCrashed(false);
  // Update chart data
  const newDataIndex = chartInstance.current.data.labels.length;
  chartInstance.current.data.labels.push(gameState.currentMultiplier);
  chartInstance.current.data.datasets[0].data.push(newDataIndex.toString());
  // Update chart
  chartInstance.current.update();

  
} else {
  setIsCrashed(true);
  // Reset chart data
  chartInstance.current.data.labels = [];
  chartInstance.current.data.datasets[0].data = [];
  // Update chart
  chartInstance.current.update();
}
}, [gameState]);

return (
  <div>
    {isCrashed ? (
      <p className='crashed-gamestate'>Game crashed. Waiting for the next game to start...</p>
    ) : (
      <canvas ref={chartRef} />
    )}
  </div>
);
};

export default CrashGraph;