import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Axios from 'axios';
import Sneakers from '../Sneakers';

jest.mock('axios');

describe('Sneakers Component', () => {
  const mockSneakers = [
    { product_id: 1, name: 'Sneaker 1', image_path: '/path/to/image1.jpg', product_price: 100 },
    { product_id: 2, name: 'Sneaker 2', image_path: '/path/to/image2.jpg', product_price: 200 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Header component', () => {
    render(
      <Router>
        <Sneakers />
      </Router>
    );

    expect(screen.getByText(/sneakers/i)).toBeInTheDocument();
  });

  test('fetches and displays sneakers', async () => {
    Axios.get.mockResolvedValueOnce({ data: { sneakers: mockSneakers } });

    render(
      <Router>
        <Sneakers />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Sneaker 1')).toBeInTheDocument();
      expect(screen.getByText('Sneaker 2')).toBeInTheDocument();
    });

    expect(screen.getByText('Sneaker 1')).toBeInTheDocument();
    expect(screen.getByText('Sneaker 2')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(mockSneakers.length);
  });

  test('handles API errors gracefully', async () => {
    Axios.get.mockRejectedValueOnce(new Error('Error fetching sneakers'));

    render(
      <Router>
        <Sneakers />
      </Router>
    );

    await waitFor(() => {
      expect(screen.queryByText('Sneaker 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Sneaker 2')).not.toBeInTheDocument();
    });

    expect(screen.queryByText('Sneaker 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Sneaker 2')).not.toBeInTheDocument();
  });
});
