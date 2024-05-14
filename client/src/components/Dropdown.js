import React, { useState } from 'react';
import './Dropdown.scss';

const Dropdown = ({ title, items, emptyMessage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-button">
        {title}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} className="dropdown-item">
                <p>Order Number: {item.orderNumber}</p>
                <p>Order Date: {item.orderDate}</p>
                <p>Products: {item.products.join(', ')}</p>
              </div>
            ))
          ) : (
            <p>{emptyMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
