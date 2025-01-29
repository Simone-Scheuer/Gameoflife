// conways-game-of-life/src/components/Cell.jsx
import React from 'react';
import './Cell.css';

const cellColors = [
  '#f0f8ff', // 0: Dead cell (light blue)
  '#add8e6', // 1: Light blue
  '#87cefa', // 2: Sky blue
  '#4682b4', // 3: Steel blue
  '#4169e1', // 4: Royal blue
  '#0000ff', // 5: Blue
  '#0000cd', // 6: Medium blue
  '#00008b', // 7: Dark blue
  '#8b0000', // 8: Dark red
  '#ff4500', // 9: Orange red
  '#ff7f7f', // 10: Softer red (less bright)
];

const Cell = React.memo(({ age, toggle }) => {
  const getBackgroundColor = (age) => {
    if (age === 0) {
      return '#e5e5e7'; // Dead cell color (grey)
    }
    return cellColors[age] || cellColors[cellColors.length - 1]; // Use the last color if age exceeds defined range
  };

  const style = {
    backgroundColor: getBackgroundColor(age),
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.1s',
  };

  return (
    <div 
      className="cell" 
      style={style}
      onClick={toggle}
    />
  );
}, (prevProps, nextProps) => {
  return prevProps.age === nextProps.age;
});

export default Cell;