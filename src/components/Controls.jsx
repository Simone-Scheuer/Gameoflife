import React from 'react';
import './Controls.css';

function Controls({ 
  running, 
  toggleRunning, 
  speed, 
  setSpeed, 
  handleReset 
}) {
  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value));
  };

  return (
    <div className="controls">
      {!running ? (
        <button onClick={toggleRunning}>Start</button>
      ) : (
        <button onClick={toggleRunning}>Stop</button>
      )}

      <div className="speed-control">
        <label htmlFor="speedRange">Speed:</label>
        <input
          type="range"
          id="speedRange"
          name="speedRange"
          min="1" // Minimum set to 1 generation per second
          max="20" // Maximum set to 20 generations per second
          step="1"
          value={speed}
          onChange={handleSpeedChange}
        />
        <span>{speed} gen/sec</span>
      </div>

      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Controls;