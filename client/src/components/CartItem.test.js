import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import cartReducer, { removeFromCart } from '../app/features/cart/cartSlice'; // Adjust path as necessary
import CartItem from './CartItem';

const renderWithProviders = (ui, { preloadedState = {}, store = configureStore({ reducer: { cart: cartReducer }, preloadedState }) } = {}) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  );
};

describe('CartItem Component', () => {
  const mockItem = {
    product_id: 1,
    image_path: 'path1.jpg',
    name: 'product_1',
    product_price: '10.00'
  };

  test('renders cart item correctly', () => {
    renderWithProviders(<CartItem {...mockItem} />);

    expect(screen.getByText(mockItem.name.replace(/_/g, ' '))).toBeInTheDocument();
    expect(screen.getByText(`$${mockItem.product_price}`)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pants/i })).toHaveAttribute('src', mockItem.image_path);
  });

  test('opens and closes the RemoveFromCartModal', () => {
    renderWithProviders(<CartItem {...mockItem} />);

    // Open the modal
    fireEvent.click(screen.getByText('Remove'));
    expect(screen.getByText('Remove from cart?')).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByText('Cancel')); // Assuming there's a cancel button in the modal
    expect(screen.queryByText('Remove from cart?')).not.toBeInTheDocument();
  });

  test('dispatches removeFromCart action', () => {
    const store = configureStore({ reducer: { cart: cartReducer } });
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    renderWithProviders(<CartItem {...mockItem} />, { store });

    // Open the modal
    fireEvent.click(screen.getByText('Remove'));

    // Confirm removal
    fireEvent.click(screen.getByText('Remove from cart')); // Assuming there's a button with this text in the modal
    expect(mockDispatch).toHaveBeenCalledWith(removeFromCart({ id: mockItem.product_id }));
  });
});
