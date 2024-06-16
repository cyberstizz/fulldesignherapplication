// src/components/Jackets.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Axios from 'axios';
import Jackets from './Jackets';

jest.mock('axios');

describe('Jackets Component', () => {
  beforeEach(() => {
    Axios.get.mockClear();
  });

  test('renders without crashing', () => {
    render(
      <Router>
        <Jackets />
      </Router>
    );

    // Check if Header component is rendered
    expect(screen.getByRole('banner')).toBeInTheDocument();

    // Check if the Jackets header is rendered
    expect(screen.getByText(/Jackets/i)).toBeInTheDocument();
  });

  test('fetches and displays jackets data', async () => {
    const mockJackets = [
      { product_id: 1, name: 'Jacket 1', image_path: '/images/jacket1.jpg', product_price: 100 },
      { product_id: 2, name: 'Jacket 2', image_path: '/images/jacket2.jpg', product_price: 150 }
    ];
    Axios.get.mockResolvedValue({ status: 200, data: { jackets: mockJackets } });

    render(
      <Router>
        <Jackets />
      </Router>
    );

    await waitFor(() => {
      mockJackets.forEach(jacket => {
        expect(screen.getByText(jacket.name)).toBeInTheDocument();
        expect(screen.getByAltText(jacket.name)).toBeInTheDocument();
        expect(screen.getByText(`$${jacket.product_price}`)).toBeInTheDocument();
      });
    });
  });

  test('handles API errors gracefully', async () => {
    Axios.get.mockRejectedValue(new Error('Error fetching jackets data'));

    render(
      <Router>
        <Jackets />
      </Router>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Jacket/i)).not.toBeInTheDocument();
    });
  });

  test('renders SubMenuComponent for each jacket', async () => {
    const mockJackets = [
      { product_id: 1, name: 'Jacket 1', image_path: '/images/jacket1.jpg', product_price: 100 },
      { product_id: 2, name: 'Jacket 2', image_path: '/images/jacket2.jpg', product_price: 150 }
    ];
    Axios.get.mockResolvedValue({ status: 200, data: { jackets: mockJackets } });

    render(
      <Router>
        <Jackets />
      </Router>
    );

    await waitFor(() => {
      mockJackets.forEach(jacket => {
        expect(screen.getByText(jacket.name)).toBeInTheDocument();
        expect(screen.getByAltText(jacket.name)).toBeInTheDocument();
        expect(screen.getByText(`$${jacket.product_price}`)).toBeInTheDocument();
      });
    });
  });

  test('navigates to jacket detail page on jacket click', async () => {
    const mockJackets = [
      { product_id: 1, name: 'Jacket 1', image_path: '/images/jacket1.jpg', product_price: 100 },
      { product_id: 2, name: 'Jacket 2', image_path: '/images/jacket2.jpg', product_price: 150 }
    ];
    Axios.get.mockResolvedValue({ status: 200, data: { jackets: mockJackets } });

    render(
      <Router>
        <Jackets />
      </Router>
    );

    await waitFor(() => {
      mockJackets.forEach(jacket => {
        fireEvent.click(screen.getByText(jacket.name));
        expect(window.location.pathname).toBe(`/jacket/${jacket.product_id}`);
      });
    });
  });
});
