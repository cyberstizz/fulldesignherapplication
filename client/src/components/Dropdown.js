import React, { useState } from 'react';
import './Dropdown.scss'; // Import your CSS for Dropdown

const Dropdown = ({ title, items, emptyMessage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)}>{title}</button>
      {isOpen && (
        <div className="dropdown-content">
          {items.length > 0 ? (
            items.map((item, index) => <div key={index}>{item}</div>)
          ) : (
            <div>{emptyMessage}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
