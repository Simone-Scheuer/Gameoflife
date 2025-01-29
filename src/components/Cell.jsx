import React from 'react';
import './Cell.css';

const Cell = React.memo(({ age, toggle, cellSize }) => {
  // Generate color based on age
  const getColor = (age) => {
    const cellColors = [
      '#d3d3d3', // 0: Dead cell (dark gray)
      '#87ceeb', // 2: Darker sky blue
      '#4682b4', // 3: Darker steel blue
      '#3b5998', // 4: Darker royal blue
      '#3b5998', // 5: Darker blue
      '#00008b', // 6: Dark blue
      '#000080', // 7: Darker blue
      '#7e1f1f', // 8: Darker dark red
      '#cd3700', // 9: Darker orange red
      '#ff6f6f', // 10: Darker softer red
    ];
    return cellColors[age] || '#d3d3d3'; // Default to dark gray for any age not in the range
  };

  const style = {
    width: `${cellSize - 2}px`, // Account for borders
    height: `${cellSize - 2}px`,
    backgroundColor: getColor(age),
    cursor: 'pointer',
  };

  return (
    <div 
      className="cell" 
      style={style}
      onClick={toggle}
    />
  );
}, (prevProps, nextProps) => {
  return prevProps.age === nextProps.age && prevProps.cellSize === nextProps.cellSize;
});

export default Cell;