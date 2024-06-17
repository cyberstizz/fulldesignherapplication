// src/components/RemoveFromCartModal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RemoveFromCartModal from './RemoveFromCartModal';

describe('RemoveFromCartModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnRemove.mockClear();
  });

  test('does not render modal when isOpen is false', () => {
    render(
      <RemoveFromCartModal isOpen={false} onClose={mockOnClose} onRemove={mockOnRemove} />
    );

    expect(screen.queryByText('Remove from cart?')).toBeNull();
  });

  test('renders modal when isOpen is true', () => {
    render(
      <RemoveFromCartModal isOpen={true} onClose={mockOnClose} onRemove={mockOnRemove} />
    );

    expect(screen.getByText('Remove from cart?')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('calls onClose when the overlay is clicked', () => {
    render(
      <RemoveFromCartModal isOpen={true} onClose={mockOnClose} onRemove={mockOnRemove} />
    );

    fireEvent.click(screen.getByText('Remove from cart?').closest('.removeFromCartModal-overlay'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onClose when the Cancel button is clicked', () => {
    render(
      <RemoveFromCartModal isOpen={true} onClose={mockOnClose} onRemove={mockOnRemove} />
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onRemove when the Yes button is clicked', () => {
    render(
      <RemoveFromCartModal isOpen={true} onClose={mockOnClose} onRemove={mockOnRemove} />
    );

    fireEvent.click(screen.getByText('Yes'));

    expect(mockOnRemove).toHaveBeenCalled();
  });

  test('does not call onClose or onRemove when clicking inside the modal', () => {
    render(
      <RemoveFromCartModal isOpen={true} onClose={mockOnClose} onRemove={mockOnRemove} />
    );

    fireEvent.click(screen.getByText('Remove from cart?').closest('.removeFromCartModal'));

    expect(mockOnClose).not.toHaveBeenCalled();
    expect(mockOnRemove).not.toHaveBeenCalled();
  });
});
