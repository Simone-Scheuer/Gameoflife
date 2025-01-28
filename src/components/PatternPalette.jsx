import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import patterns from '../patterns';
import './PatternPalette.css';

function PatternPalette() {
  const [isOpen, setIsOpen] = useState(true); // Set to true to show options by default

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="pattern-palette">
      <h2 onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
        Pattern Palette {isOpen ? '▲' : '▼'}
      </h2>
      {isOpen && (
        <div className="patterns" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}> {/* Center items */}
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
      className="pattern-item" 
      ref={drag} 
      style={{ opacity: isDragging ? 0.5 : 1, margin: '0 10px' }} // Add margin for spacing
    >
      {name}
    </div>
  );
}

export default PatternPalette;
