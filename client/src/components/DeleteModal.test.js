import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteModal from './DeleteModal';

describe('DeleteModal', () => {
  const mockOnClose = jest.fn();
  const mockOnDelete = jest.fn();
  const productName = 'test_product';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly when open', () => {
    render(
      <DeleteModal
        isOpen={true}
        onClose={mockOnClose}
        productName={productName}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText(`Are you sure you want to delete ${productName}? It will be gone forever.`)).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    render(
      <DeleteModal
        isOpen={false}
        onClose={mockOnClose}
        productName={productName}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.queryByText(`Are you sure you want to delete ${productName}? It will be gone forever.`)).not.toBeInTheDocument();
  });

  test('calls onClose when clicking outside the modal', () => {
    render(
      <DeleteModal
        isOpen={true}
        onClose={mockOnClose}
        productName={productName}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByText(`Are you sure you want to delete ${productName}? It will be gone forever.`).parentNode.parentNode);

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onClose when clicking the close button', () => {
    render(
      <DeleteModal
        isOpen={true}
        onClose={mockOnClose}
        productName={productName}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByText('×'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onClose when clicking the cancel button', () => {
    render(
      <DeleteModal
        isOpen={true}
        onClose={mockOnClose}
        productName={productName}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onDelete and onClose when clicking the delete button', () => {
    render(
      <DeleteModal
        isOpen={true}
        onClose={mockOnClose}
        productName={productName}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByText('Delete'));

    expect(mockOnDelete).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
