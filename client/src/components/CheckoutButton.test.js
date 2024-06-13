import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import CheckoutButton from './CheckoutButton';

jest.mock('axios');
jest.mock('react-stripe-checkout', () => {
  return ({ stripeKey, token, name, amount, children }) => (
    <div onClick={() => token({ id: 'test-token' })}>{children}</div>
  );
});

const MockSuccessPage = () => <div>Success</div>;
const MockFailurePage = () => <div>Failure</div>;

describe('CheckoutButton Component', () => {
  const mockProps = {
    name: 'Test Product',
    price: 100,
  };

  test('renders checkout button correctly', () => {
    render(
      <BrowserRouter>
        <CheckoutButton {...mockProps} />
      </BrowserRouter>
    );

    expect(screen.getByText('Buy Now')).toBeInTheDocument();
  });

  test('handles successful payment', async () => {
    axios.post.mockResolvedValue({ status: 200, data: { success: true } });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CheckoutButton {...mockProps} />} />
          <Route path="/success" element={<MockSuccessPage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Buy Now'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/payments', JSON.stringify({
        token: { id: 'test-token' },
        product: { name: mockProps.name, price: mockProps.price }
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    });

    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  test('handles failed payment', async () => {
    axios.post.mockRejectedValue(new Error('Payment failed'));

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CheckoutButton {...mockProps} />} />
          <Route path="/failure" element={<MockFailurePage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Buy Now'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/payments', JSON.stringify({
        token: { id: 'test-token' },
        product: { name: mockProps.name, price: mockProps.price }
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    });

    expect(screen.getByText('Failure')).toBeInTheDocument();
  });
});
