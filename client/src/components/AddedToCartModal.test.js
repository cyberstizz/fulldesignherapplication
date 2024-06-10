import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddedToCartModal from './AddedToCartModal';
import '../localStorageMock';
console.log('localStorageMock loaded');


describe('AddedToCartModal', () => {
  const mockOnClose = jest.fn();
  const mockOnGoToCart = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnGoToCart.mockClear();
  });

  test('renders when isOpen is true', () => {
    render(<AddedToCartModal isOpen={true} onClose={mockOnClose} onGoToCart={mockOnGoToCart} productName="Test Product" />);
    expect(screen.getByText('Test Product was added to your cart!!')).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    const { container } = render(<AddedToCartModal isOpen={false} onClose={mockOnClose} onGoToCart={mockOnGoToCart} productName="Test Product" />);
    expect(container).toBeEmptyDOMElement();
  });

  test('displays the correct product name', () => {
    render(<AddedToCartModal isOpen={true} onClose={mockOnClose} onGoToCart={mockOnGoToCart} productName="Test Product" />);
    expect(screen.getByText('Test Product was added to your cart!!')).toBeInTheDocument();
  });

  test('calls onClose when Ok button is clicked', () => {
    render(<AddedToCartModal isOpen={true} onClose={mockOnClose} onGoToCart={mockOnGoToCart} productName="Test Product" />);
    fireEvent.click(screen.getByText('Ok'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onGoToCart when Go to cart button is clicked', () => {
    render(<AddedToCartModal isOpen={true} onClose={mockOnClose} onGoToCart={mockOnGoToCart} productName="Test Product" />);
    fireEvent.click(screen.getByText('Go to cart'));
    expect(mockOnGoToCart).toHaveBeenCalledTimes(1);
  });
});
