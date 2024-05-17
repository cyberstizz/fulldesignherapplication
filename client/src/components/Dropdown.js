import React, { useState } from 'react';

const Dropdown = ({ title, items = [], emptyMessage, type }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="dropdown">
      <h3 onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
        {title} {isOpen ? '▲' : '▼'}
      </h3>
      {isOpen && (
        items.length > 0 ? (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <div className="dropdown-item">
                  <h4>{item.title}</h4>
                  <div>{item.content}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>{emptyMessage}</p>
        )
      )}
    </div>
  );
};

export default Dropdown;

