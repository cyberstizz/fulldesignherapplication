import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddToCartModal from './AddToCartModal';

describe('AddToCartModal', () => {
  const mockOnClose = jest.fn();
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnAdd.mockClear();
  });

  test('renders when isOpen is true', () => {
    render(<AddToCartModal isOpen={true} onClose={mockOnClose} onAdd={mockOnAdd} productName="Test Product" />);
    expect(screen.getByText('Add Test Product to cart?')).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    const { container } = render(<AddToCartModal isOpen={false} onClose={mockOnClose} onAdd={mockOnAdd} productName="Test Product" />);
    expect(container).toBeEmptyDOMElement();
  });

  test('displays the correct product name', () => {
    render(<AddToCartModal isOpen={true} onClose={mockOnClose} onAdd={mockOnAdd} productName="Test Product" />);
    expect(screen.getByText('Add Test Product to cart?')).toBeInTheDocument();
  });

  test('calls onClose when Close button is clicked', () => {
    render(<AddToCartModal isOpen={true} onClose={mockOnClose} onAdd={mockOnAdd} productName="Test Product" />);
    fireEvent.click(screen.getByText('Close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onAdd when Add button is clicked', () => {
    render(<AddToCartModal isOpen={true} onClose={mockOnClose} onAdd={mockOnAdd} productName="Test Product" />);
    fireEvent.click(screen.getByText('Add'));
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

});
