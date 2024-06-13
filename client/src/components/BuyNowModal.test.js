import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BuyNowModal from './BuyNowModal';

describe('BuyNowModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test('renders when isOpen is true', () => {
    render(<BuyNowModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('buy now Modal')).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    const { container } = render(<BuyNowModal isOpen={false} onClose={mockOnClose} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('calls onClose when the close button is clicked', () => {
    render(<BuyNowModal isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('×'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when clicking inside the modal', () => {
    render(<BuyNowModal isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('buy now Modal'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('calls onClose when clicking on the overlay', () => {
    render(<BuyNowModal isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
