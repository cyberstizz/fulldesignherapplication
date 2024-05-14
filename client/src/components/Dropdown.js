import React, { useState } from 'react';

const Dropdown = ({ title, items, emptyMessage, type }) => {
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
                {type === "orders" ? (
                  <>
                    <p>Order Number: {item.order_number}</p>
                    <p>Order Date: {item.order_date}</p>
                    <p>Products: {item.product_ids.join(', ')}</p>
                  </>
                ) : (
                  <>
                    <p>Review ID: {item.review_id}</p>
                    <p>Product ID: {item.product_id}</p>
                    <p>Product Type: {item.product_type}</p>
                    <p>Headline: {item.headline}</p>
                    <p>Review: {item.review}</p>
                    <p>Rating: {item.rating}</p>
                  </>
                )}
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
