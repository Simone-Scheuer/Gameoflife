import React from 'react';
import './Controls.css';
import patterns from '../patterns';

function Controls({ running, setRunning, toggleRunning, runSimulation, setGrid, speed, setSpeed, handleReset }) {
  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value));
  };

  const applyPattern = (patternName) => {
    const pattern = patterns[patternName];
    if (!pattern) {
      console.error(`Pattern "${patternName}" not found.`);
      return;
    }

    console.log(`Applying pattern: ${patternName}`, pattern);

    setGrid((prevGrid) => {
      // Clone the current grid
      const newGrid = prevGrid.map(row => [...row]);

      // Find the center of the grid
      const numRows = newGrid.length;
      const numCols = newGrid[0].length;
      const centerRow = Math.floor(numRows / 2);
      const centerCol = Math.floor(numCols / 2);

      // Clear the grid before applying the new pattern
      const clearedGrid = newGrid.map(row => row.map(() => 0));

      // Apply the pattern
      pattern.forEach(([x, y]) => {
        const row = centerRow + x;
        const col = centerCol + y;
        if (row >= 0 && row < numRows && col >= 0 && col < numCols) {
          clearedGrid[row][col] = 1;
        }
      });

      return clearedGrid;
    });
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

      <div className="pattern-control">
        <label htmlFor="patternSelect">Add Pattern: </label>
        <select 
          id="patternSelect" 
          onChange={(e) => {
            if (e.target.value !== "") {
              applyPattern(e.target.value);
              e.target.value = "";
            }
          }}
        >
          <option value="">--Select a Pattern--</option>
          {Object.keys(patterns).map((patternName) => (
            <option key={patternName} value={patternName}>
              {patternName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Controls;