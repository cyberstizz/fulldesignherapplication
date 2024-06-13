import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import cartReducer from '../app/features/cart/cartSlice'; // Adjust path as necessary
import Cart from './Cart';

const renderWithProviders = (ui, { preloadedState = {}, store = configureStore({ reducer: { cart: cartReducer }, preloadedState }) } = {}) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  );
};

describe('Cart Component', () => {
  const mockItems = [
    { product_id: 1, image_path: 'path1.jpg', name: 'product_1', product_price: '10.00' },
    { product_id: 2, image_path: 'path2.jpg', name: 'product_2', product_price: '20.00' },
  ];

  const preloadedState = {
    cart: {
      items: mockItems,
    },
  };

  test('renders cart items correctly', () => {
    renderWithProviders(<Cart />, { preloadedState });

    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByText('Total: $30.00')).toBeInTheDocument();
    mockItems.forEach(item => {
      expect(screen.getByText(item.name.replace(/_/g, ' '))).toBeInTheDocument();
      expect(screen.getByText(`$${item.product_price}`)).toBeInTheDocument();
    });
  });

  test('opens CustomStripeModal on checkout button click', () => {
    renderWithProviders(<Cart />, { preloadedState });

    fireEvent.click(screen.getByText('Checkout'));
    expect(screen.getByText('cart')).toBeInTheDocument(); // Assuming the modal displays the product name "cart"
  });

  test('clears the cart on Clear Cart button click', () => {
    renderWithProviders(<Cart />, { preloadedState });

    fireEvent.click(screen.getByText('Clear Cart'));
    expect(screen.getByText('Total: $0.00')).toBeInTheDocument();
  });

  test('navigates back on arrow icon click', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    renderWithProviders(<Cart />, { preloadedState });

    fireEvent.click(screen.getByRole('button', { name: /arrow-left/i }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
