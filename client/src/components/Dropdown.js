import React, { useState } from 'react';
import './Dropdown.scss'; // Import your CSS for Dropdown

const Dropdown = ({ title, items, emptyMessage, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = () => {
    setIsOpen(false); // Close the dropdown when an item is clicked
    onClick(); // Trigger the fetch function passed through props
  };

  return (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)}>{title}</button>
      {isOpen && (
        <div className="dropdown-content">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} onClick={handleItemClick}>
                {item}
              </div>
            ))
          ) : (
            <div>{emptyMessage}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
