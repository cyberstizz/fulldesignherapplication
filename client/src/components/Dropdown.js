import React, { useState } from 'react';

const Dropdown = ({ title, items = [], emptyMessage, type }) => {
  // State to track if the dropdown is open
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown's open/close state
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="dropdown">
      {/* Clickable title to toggle the dropdown */}
      <h3 onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
        {title} {isOpen ? '▲' : '▼'} {/* Arrow indicates the dropdown state */}
      </h3>
      {isOpen && ( // Render content only if the dropdown is open
        items.length > 0 ? ( // Check if there are items to display
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <div className="dropdown-item">
                  <h4>{item.title}</h4> {/* Item title */}
                  <div>{item.content}</div> {/* Item content */}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>{emptyMessage}</p> // Message when no items are available
        )
      )}
    </div>
  );
};

export default Dropdown;
