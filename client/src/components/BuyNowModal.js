// BuyNowModal.js
import React from 'react'; // Import React library
import './BuyNowModal.scss'; // Import the stylesheet for this component

// Define the BuyNowModal component, accepting isOpen and onClose as props
const BuyNowModal = ({ isOpen, onClose }) => {
  // If the modal is not open, return null (do not render anything)
  if (!isOpen) return null;

  return (
    // Modal overlay that listens for click events to close the modal
    <div className="modal-overlay" onClick={onClose} data-testid="modal-overlay">
      {/* Modal content that stops propagation of click events */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Button to close the modal */}
        <button className="close-button" onClick={onClose}>
          &times; {/* HTML entity for a multiplication sign (×) */}
        </button>
        {/* Modal content */}
        <div>buy now Modal</div>
      </div>
    </div>
  );
};

export default BuyNowModal; // Export the BuyNowModal component as the default export
