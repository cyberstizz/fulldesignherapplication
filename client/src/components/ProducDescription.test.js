// src/components/ProductDescription.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import ProductDescription from './ProductDescription';
import { addToCart } from '../app/features/cart/cartSlice';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('axios');

// Mock child components
jest.mock('./AddToCartModal', () => ({ isOpen, onClose, onAdd, productName }) => isOpen && (
  <div data-testid="add-to-cart-modal">
    <button onClick={onAdd}>Add</button>
    <button onClick={onClose}>Close</button>
    <div>{productName}</div>
  </div>
));

jest.mock('./AddedToCartModal', () => ({ isOpen, onClose, onGoToCart, productName }) => isOpen && (
  <div data-testid="added-to-cart-modal">
    <button onClick={onGoToCart}>Go to Cart</button>
    <button onClick={onClose}>Close</button>
    <div>{productName}</div>
  </div>
));

jest.mock('./CustomStripeModal', () => ({ isOpen, onClose, totalPrice, productName, productType }) => isOpen && (
  <div data-testid="custom-stripe-modal">
    <button onClick={onClose}>Close</button>
    <div>{totalPrice}</div>
    <div>{productName}</div>
  </div>
));

jest.mock('./ReviewModal', () => ({ isOpen, onClose, userId, productId, productType }) => isOpen && (
  <div data-testid="review-modal">
    <button onClick={onClose}>Close</button>
  </div>
));

describe('ProductDescription Component', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
    useParams.mockReturnValue({ productCategory: 'jackets', productId: '123' });
    Axios.get.mockClear();
  });

  test('renders loading state initially', () => {
    render(
      <Router>
        <ProductDescription />
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('fetches and displays product data', async () => {
    const productData = {
      jackets: {
        name: 'Test Jacket',
        image_path: '/path/to/image.jpg',
        description: 'Test description',
        product_price: 100,
        product_type: 'jackets',
        product_id: '123',
      },
    };
    const averageRatingData = { averageRating: 4.5 };

    Axios.get.mockResolvedValueOnce({ data: productData });
    Axios.get.mockResolvedValueOnce({ data: averageRatingData });

    render(
      <Router>
        <ProductDescription />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Test Jacket')).toBeInTheDocument());
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Average Rating: 4.5')).toBeInTheDocument();
  });

  test('handles add to cart and open added to cart modal', async () => {
    const productData = {
      jackets: {
        name: 'Test Jacket',
        image_path: '/path/to/image.jpg',
        description: 'Test description',
        product_price: 100,
        product_type: 'jackets',
        product_id: '123',
      },
    };
    Axios.get.mockResolvedValueOnce({ data: productData });

    render(
      <Router>
        <ProductDescription />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Test Jacket')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Add to cart'));
    fireEvent.click(screen.getByText('Add'));

    expect(mockDispatch).toHaveBeenCalledWith(addToCart(productData.jackets));
    expect(screen.getByTestId('added-to-cart-modal')).toBeInTheDocument();
  });

  test('handles buy now and opens custom stripe modal', async () => {
    const productData = {
      jackets: {
        name: 'Test Jacket',
        image_path: '/path/to/image.jpg',
        description: 'Test description',
        product_price: 100,
        product_type: 'jackets',
        product_id: '123',
      },
    };
    Axios.get.mockResolvedValueOnce({ data: productData });

    render(
      <Router>
        <ProductDescription />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Test Jacket')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Buy now'));
    expect(screen.getByTestId('custom-stripe-modal')).toBeInTheDocument();
  });

  test('handles write a review and opens review modal', async () => {
    const productData = {
      jackets: {
        name: 'Test Jacket',
        image_path: '/path/to/image.jpg',
        description: 'Test description',
        product_price: 100,
        product_type: 'jackets',
        product_id: '123',
      },
    };
    Axios.get.mockResolvedValueOnce({ data: productData });

    render(
      <Router>
        <ProductDescription />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Test Jacket')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Write a review'));
    expect(screen.getByTestId('review-modal')).toBeInTheDocument();
  });

  test('navigates to the previous page when the arrow is clicked', async () => {
    const productData = {
      jackets: {
        name: 'Test Jacket',
        image_path: '/path/to/image.jpg',
        description: 'Test description',
        product_price: 100,
        product_type: 'jackets',
        product_id: '123',
      },
    };
    Axios.get.mockResolvedValueOnce({ data: productData });

    render(
      <Router>
        <ProductDescription />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Test Jacket')).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', { name: 'fa-arrow-left' }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
