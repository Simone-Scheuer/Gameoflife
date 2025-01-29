import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Cell from './Cell';
import patterns from '../patterns';
import './Grid.css';

const Grid = React.memo(({ grid, setGrid, toggleCell }) => {
  const [preview, setPreview] = useState({ pattern: null, position: { i: 0, j: 0 } });
  const cellSize = 11; // Halved cell size

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'PATTERN',
    hover: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const gridElement = document.getElementById('grid-container');
      if (!gridElement || !clientOffset) return;

      const gridBounds = gridElement.getBoundingClientRect();
      const relativeX = clientOffset.x - gridBounds.left;
      const relativeY = clientOffset.y - gridBounds.top;

      const i = Math.floor(relativeY / cellSize);
      const j = Math.floor(relativeX / cellSize);

      setPreview({
        pattern: item.name,
        position: { i, j },
      });
    },
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const gridElement = document.getElementById('grid-container');
      if (!gridElement || !clientOffset) return;

      const gridBounds = gridElement.getBoundingClientRect();
      const relativeX = clientOffset.x - gridBounds.left;
      const relativeY = clientOffset.y - gridBounds.top;

      const i = Math.floor(relativeY / cellSize);
      const j = Math.floor(relativeX / cellSize);

      applyPattern(item.name, i, j);
      setPreview({ pattern: null, position: { i, j } });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }), [setGrid, cellSize]);

  const applyPattern = (patternName, startRow, startCol) => {
    const pattern = patterns[patternName];
    if (!pattern) {
      console.error(`Pattern "${patternName}" not found.`);
      return;
    }

    if (!Array.isArray(pattern)) {
      console.error(`Pattern "${patternName}" is not an array.`);
      return;
    }

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map(row => [...row]);

      pattern.forEach(([x, y]) => {
        const row = startRow + x;
        const col = startCol + y;
        if (row >= 0 && row < newGrid.length && col >= 0 && col < newGrid[0].length) {
          newGrid[row][col] = newGrid[row][col] === 0 ? 1 : newGrid[row][col] + 1; // Activate or increment age
        }
      });

      return newGrid;
    });
  };

  const isActive = isOver && canDrop;

  return (
    <div 
      className={`grid ${isActive ? 'grid-active' : ''}`} 
      ref={drop} 
      id="grid-container"
      style={{
        width: `${cellSize * grid[0].length}px`,
        height: `${cellSize * grid.length}px`
      }}
    >
      {grid.map((row, i) => (
        <div key={`row-${i}`} className="row">
          {row.map((age, j) => (
            <Cell 
              key={`cell-${i}-${j}`} 
              age={age} 
              toggle={() => toggleCell(i, j)} 
              cellSize={cellSize}
            />
          ))}
        </div>
      ))}

      {/* Pattern Preview Overlay */}
      {preview.pattern && patterns[preview.pattern] && Array.isArray(patterns[preview.pattern]) && (
        <div 
          className="pattern-preview" 
          style={{
            position: 'absolute',
            top: `${preview.position.i * cellSize}px`,
            left: `${preview.position.j * cellSize}px`,
            pointerEvents: 'none',
            opacity: 1,
            zIndex: 15,
            width: `${cellSize}px`, // Match normal cell size
            height: `${cellSize}px`, // Match normal cell size
          }}
        >
          {patterns[preview.pattern].map(([x, y], index) => (
            <div 
              key={index} 
              className="cell-preview"
              style={{
                position: 'absolute',
                top: `${x * cellSize}px`,
                left: `${y * cellSize}px`,
                width: `${cellSize - 2}px`, // Account for borders
                height: `${cellSize - 2}px`,
                backgroundColor: 'inherit', // Match normal cell styling
                border: '1px solid #e5e5e7',
                borderRadius: '1px',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default Grid;

// Helper functions
function getPatternWidth(pattern) {
  if (!pattern || !Array.isArray(pattern)) return 0;
  const maxY = Math.max(...pattern.map(([x, y]) => y));
  return maxY + 1;
}

function getPatternHeight(pattern) {
  if (!pattern || !Array.isArray(pattern)) return 0;
  const maxX = Math.max(...pattern.map(([x, y]) => x));
  return maxX + 1;
}