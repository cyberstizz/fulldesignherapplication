import React from 'react';

const Dropdown = ({ title, items = [], emptyMessage, type }) => {
  return (
    <div className="dropdown">
      <h3>{title}</h3>
      {items.length > 0 ? (
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
      )}
    </div>
  );
};

export default Dropdown;
