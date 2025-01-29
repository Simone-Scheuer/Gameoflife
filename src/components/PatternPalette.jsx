import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import patterns from '../patterns';
import './PatternPalette.css';

function PatternPalette() {
  const [isOpen, setIsOpen] = useState(true); // Show options by default

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="pattern-palette">
      <h2 onClick={toggleDropdown} className="pattern-palette-title">
        Drag and Drop Patterns {isOpen ? '▲' : '▼'}
      </h2>
      {isOpen && (
        <div className="patterns">
          {Object.keys(patterns).map((patternName) => (
            <PatternItem key={patternName} name={patternName} />
          ))}
        </div>
      )}
    </div>
  );
}

function PatternItem({ name }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PATTERN',
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [name]);

  return (
    <div 
      className="pattern-item-wrapper"
      ref={drag} 
      style={{ opacity: isDragging ? 0.1 : 1}}
    >
      <span className="pattern-name">{name}</span>
    </div>
  );
}

export default PatternPalette;
