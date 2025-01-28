import React from 'react';
import './Controls.css';

function Controls({ 
  running, 
  setRunning, 
  toggleRunning, 
  runSimulation, 
  setGrid, 
  speed, 
  setSpeed, 
  handleReset 
}) {
  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value));
  };

  return (
    <div className="controls">
      <div>
        {!running ? (
          <button onClick={toggleRunning}>Start</button>
        ) : (
          <button onClick={toggleRunning}>Stop</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="speed-control">
        <label htmlFor="speedRange">Speed: </label>
        <input
          type="range"
          id="speedRange"
          name="speedRange"
          min="10"
          max="500"
          step="10"
          value={speed}
          onChange={handleSpeedChange}
        />
        <span>{speed} ms</span>
      </div>
    </div>
  );
}

export default Controls;