// conways-game-of-life/src/App.jsx
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Grid from './components/Grid';
import Controls from './components/Controls';
import './App.css';

const numRows = 32;
const numCols = 50;

// Function to create an empty grid
const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

function App() {
  const [grid, setGrid] = useState(() => generateEmptyGrid());
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(100); // Speed in milliseconds

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      const newGrid = g.map(arr => [...arr]);

      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          let neighbors = 0;
          const directions = [
            [0,1], [0,-1],
            [1,0], [-1,0],
            [1,1], [-1,-1],
            [1,-1], [-1,1]
          ];

          // Count live neighbors
          directions.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
              neighbors += g[newI][newJ];
            }
          });

          // Apply Conway's Game of Life rules

          // Rule 1 and Rule 3: Underpopulation and Overpopulation
          if (g[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
            newGrid[i][j] = 0;
          }
          // Rule 4: Reproduction
          else if (g[i][j] === 0 && neighbors === 3) {
            newGrid[i][j] = 1;
          }
          // Rule 2: Survival
          else {
            newGrid[i][j] = g[i][j];
          }
        }
      }

      return newGrid;
    });

    setTimeout(runSimulation, speed);
  }, [speed]);

  useEffect(() => {
    if (running) {
      runSimulation();
    }
    // Cleanup on unmount or when dependencies change
    return () => {
      // Optional: Clear any timeouts if you store their IDs
      // Example:
      // clearTimeout(timeoutIdRef.current);
    };
  }, [runSimulation, running]);

  const toggleRunning = () => {
    setRunning(prev => !prev);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const handleReset = () => {
    setRunning(false);
    setGrid(generateEmptyGrid());
  };

  const toggleCell = (i, j) => {
    setGrid((g) => {
      const newGrid = g.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === i && colIndex === j) {
            return cell ? 0 : 1;
          }
          return cell;
        })
      );
      return newGrid;
    });
  };

  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <Controls 
        running={running} 
        setRunning={setRunning} 
        toggleRunning={toggleRunning}
        runSimulation={runSimulation}
        setGrid={setGrid} // Correctly passing the setter function
        speed={speed}
        setSpeed={setSpeed}
        handleReset={handleReset}
      />
      <Grid 
        grid={grid} 
        setGrid={toggleCell} 
      />
      <p>
        This is a simple implementation of Conway's Game of Life.
        The game is a cellular automaton that simulates the growth and spread of life.
      </p>
      <ul>
        <li>
          Rule 1: If a cell is alive and has less than 2 or more than 3 live neighbors, it dies.
        </li>
        <li>
          Rule 2: If a cell is dead and has exactly 3 live neighbors, it becomes alive.
        </li>
        <li>
          Rule 3: If a cell is alive and has 2 or 3 live neighbors, it survives.
        </li>
        <li>
          Rule 4: Any dead cell with exactly three live neighbours becomes a live cell.
        </li>
      </ul>
    </div>
  );
}

export default App;