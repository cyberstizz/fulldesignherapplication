import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CustomStripeModal from './CustomStripeModal';
import { clearCart } from '../app/features/cart/cartSlice';
import axios from 'axios';
import { useStripe, useElements } from '@stripe/react-stripe-js';


jest.mock('axios');
jest.mock('@stripe/react-stripe-js', () => ({
  useStripe: jest.fn(),
  useElements: jest.fn(),
  CardElement: jest.fn(),
}));

const mockStore = configureStore([]);
const stripePromise = loadStripe('pk_test_12345'); // Mock stripe public key

describe('CustomStripeModal', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  test('renders correctly when open', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Elements stripe={stripePromise}>
            <CustomStripeModal
              isOpen={true}
              onClose={jest.fn()}
              totalPrice={100}
              productName="test_product"
              productType="test_type"
            />
          </Elements>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('buy test product with secure checkout')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByText('Pay $100.00')).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Elements stripe={stripePromise}>
            <CustomStripeModal
              isOpen={false}
              onClose={jest.fn()}
              totalPrice={100}
              productName="test_product"
              productType="test_type"
            />
          </Elements>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('buy test product with secure checkout')).not.toBeInTheDocument();
  });

  test('handles input changes correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Elements stripe={stripePromise}>
            <CustomStripeModal
              isOpen={true}
              onClose={jest.fn()}
              totalPrice={100}
              productName="test_product"
              productType="test_type"
            />
          </Elements>
        </MemoryRouter>
      </Provider>
    );

    const nameInput = screen.getByPlaceholderText('Name');
    const addressInput = screen.getByPlaceholderText('Address');
    const emailInput = screen.getByPlaceholderText('Email');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    expect(nameInput.value).toBe('John Doe');
    expect(addressInput.value).toBe('123 Main St');
    expect(emailInput.value).toBe('john.doe@example.com');
  });

  test('calls onClose when clicking outside the modal', () => {
    const mockOnClose = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Elements stripe={stripePromise}>
            <CustomStripeModal
              isOpen={true}
              onClose={mockOnClose}
              totalPrice={100}
              productName="test_product"
              productType="test_type"
            />
          </Elements>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('buy test product with secure checkout').parentNode);

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls handleSubmit on form submission', async () => {
    const mockOnClose = jest.fn();
    const mockStripe = {
      confirmCardPayment: jest.fn(() => ({
        paymentIntent: { status: 'succeeded' },
      })),
    };
    const mockElements = {
      getElement: jest.fn(() => ({})),
    };

    useStripe.mockReturnValue(mockStripe);
    useElements.mockReturnValue(mockElements);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Elements stripe={stripePromise}>
            <CustomStripeModal
              isOpen={true}
              onClose={mockOnClose}
              totalPrice={100}
              productName="test_product"
              productType="test_type"
            />
          </Elements>
        </MemoryRouter>
      </Provider>
    );

    const nameInput = screen.getByPlaceholderText('Name');
    const addressInput = screen.getByPlaceholderText('Address');
    const emailInput = screen.getByPlaceholderText('Email');
    const payButton = screen.getByText('Pay $100.00');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    fireEvent.click(payButton);

    await waitFor(() => {
      expect(mockStripe.confirmCardPayment).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(clearCart());
    });
  });
});
