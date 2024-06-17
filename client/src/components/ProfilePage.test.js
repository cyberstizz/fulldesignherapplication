// src/components/ProfilePage.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProfilePage from './ProfilePage';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('axios');

// Mock child components
jest.mock('./Dropdown', () => ({ title, items, emptyMessage }) => (
  <div>
    <h2>{title}</h2>
    {items.length ? (
      items.map((item, index) => (
        <div key={index}>
          <div>{item.title}</div>
          <div>{item.content}</div>
        </div>
      ))
    ) : (
      <div>{emptyMessage}</div>
    )}
  </div>
));

describe('ProfilePage Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useParams.mockReturnValue({ userId: '123' });
    axios.get.mockClear();
    axios.delete.mockClear();
  });

  test('renders loading state initially', () => {
    render(
      <Router>
        <ProfilePage />
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('fetches and displays user data, orders, and reviews', async () => {
    const userData = { user: { username: 'testuser' } };
    const ordersData = { orders: [{ order_number: '1234', order_date: '2023-06-01', products: [{ product_id: '1', product_name: 'Test Product', product_price: 99.99 }] }] };
    const reviewsData = { reviews: [{ headline: 'Great product', rating: 5, review: 'I loved this product!' }] };

    axios.get.mockResolvedValueOnce({ data: userData });
    axios.get.mockResolvedValueOnce({ data: ordersData });
    axios.get.mockResolvedValueOnce({ data: reviewsData });

    render(
      <Router>
        <ProfilePage />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('testuser')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Order Number: 1234')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Great product')).toBeInTheDocument());
  });

  test('handles navigate back button', async () => {
    render(
      <Router>
        <ProfilePage />
      </Router>
    );

    fireEvent.click(screen.getByText('←  Back'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('handles delete account button', async () => {
    axios.delete.mockResolvedValueOnce({});

    render(
      <Router>
        <ProfilePage />
      </Router>
    );

    fireEvent.click(screen.getByText('Delete Account'));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });

  test('displays no orders message when no orders are available', async () => {
    const userData = { user: { username: 'testuser' } };
    const ordersData = { orders: [] };
    const reviewsData = { reviews: [] };

    axios.get.mockResolvedValueOnce({ data: userData });
    axios.get.mockResolvedValueOnce({ data: ordersData });
    axios.get.mockResolvedValueOnce({ data: reviewsData });

    render(
      <Router>
        <ProfilePage />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('testuser')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('You have no orders')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('You have no reviews')).toBeInTheDocument());
  });
});
