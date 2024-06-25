import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Axios from 'axios';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Jackets from './Jackets'; // Update with the correct import path

jest.mock('axios');

const mockJackets = [
  { id: 1, name: 'Jacket 1', imageUrl: '/images/jacket1.jpg' },
  { id: 2, name: 'Jacket 2', imageUrl: '/images/jacket2.jpg' }
];

describe('Jackets Component', () => {
  it('handles API errors gracefully', async () => {
    Axios.get.mockRejectedValue(new Error('API error'));

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Jackets />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryAllByText(/Jacket/i)).toHaveLength(0);
    });
  });

  it('renders SubMenuComponent for each jacket', async () => {
    Axios.get.mockResolvedValue({ status: 200, data: { jackets: mockJackets } });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Jackets />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      mockJackets.forEach(jacket => {
        expect(screen.getByText(jacket.name)).toBeInTheDocument();
        expect(screen.getByAltText(jacket.name)).toBeInTheDocument();
      });
    });
  });

  it('navigates to jacket detail page on jacket click', async () => {
    Axios.get.mockResolvedValue({ status: 200, data: { jackets: mockJackets } });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Jackets />} />
          <Route path="/jacket/:id" element={<div>Jacket Detail Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Jacket 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Jacket 1'));

    await waitFor(() => {
      expect(screen.getByText('Jacket Detail Page')).toBeInTheDocument();
    });
  });
});
