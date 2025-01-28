import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Cell from './Cell';
import patterns from '../patterns';
import './Grid.css';

const Grid = React.memo(({ grid, setGrid, toggleCell }) => {
  const [preview, setPreview] = useState({ pattern: null, position: { i: 0, j: 0 } });

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'PATTERN',
    hover: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const gridElement = document.getElementById('grid-container');
      if (!gridElement || !clientOffset) return;

      const gridBounds = gridElement.getBoundingClientRect();
      const cellSize = 22; // 20px cell + 2px border

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
      const cellSize = 22; // 20px cell + 2px border

      const relativeX = clientOffset.x - gridBounds.left;
      const relativeY = clientOffset.y - gridBounds.top;

      const i = Math.floor(relativeY / cellSize);
      const j = Math.floor(relativeX / cellSize);

      applyPattern(item.name, i, j);
      setPreview({ pattern: null, position: { i: 0, j: 0 } });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }), [setGrid]);

  const applyPattern = (patternName, startRow, startCol) => {
    const pattern = patterns[patternName];
    if (!pattern) {
      console.error(`Pattern "${patternName}" not found.`);
      return;
    }

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map(row => [...row]);

      pattern.forEach(([x, y]) => {
        const row = startRow + x;
        const col = startCol + y;
        if (row >= 0 && row < newGrid.length && col >= 0 && col < newGrid[0].length) {
          newGrid[row][col] = 1;
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
    >
      {grid.map((row, i) => (
        <div key={`row-${i}`} className="row">
          {row.map((col, j) => (
            <Cell 
              key={`cell-${i}-${j}`} 
              isAlive={col} 
              toggle={() => toggleCell(i, j)} 
            />
          ))}
        </div>
      ))}

      {/* Pattern Preview Overlay */}
      {preview.pattern && (
        <div 
          className="pattern-preview" 
          style={{
            position: 'absolute',
            top: preview.position.i * 22, // cellSize
            left: preview.position.j * 22, // cellSize
            pointerEvents: 'none',
            opacity: 0.3,
          }}
        >
          {patterns[preview.pattern].map(([x, y], index) => (
            <div 
              key={index} 
              className="cell alive" 
              style={{
                position: 'absolute',
                top: x * 22,
                left: y * 22,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default Grid;