// conways-game-of-life/src/components/Cell.jsx
import React from 'react';
import './Cell.css';

const Cell = React.memo(({ isAlive, toggle }) => {
  return (
    <div 
      className={`cell ${isAlive ? 'alive' : ''}`} 
      onClick={toggle}
    />
  );
}, (prevProps, nextProps) => {
  return prevProps.isAlive === nextProps.isAlive;
});

export default Cell;