import React from 'react';
import Cell from './Cell';
import './Grid.css';

const Grid = React.memo(({ grid, setGrid }) => {
  return (
    <div className="grid">
      {grid.map((row, i) => (
        <div key={`row-${i}`} className="row">
          {row.map((col, j) => (
            <Cell 
              key={`cell-${i}-${j}`} 
              isAlive={col} 
              toggle={() => setGrid(i, j)} 
            />
          ))}
        </div>
      ))}
    </div>
  );
});

export default Grid;