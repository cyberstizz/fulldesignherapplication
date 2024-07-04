import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; 
import Axios from 'axios';
import Boots from './Boots';

jest.mock('axios');

describe('Boots Component', () => {
  const mockedData = {
    boots: [
      {
        product_id: 1,
        name: 'Boot 1',
        image_path: './backgroundTwoDiamonds.webp',
        product_price: 100,
      },
      {
        product_id: 2,
        name: 'Boot 2',
        image_path: './backgroundTwoDiamonds.webp',
        product_price: 150,
      },
    ],
  };

  beforeEach(() => {
    Axios.get.mockResolvedValueOnce({ data: mockedData });
  });

  test('renders Boots component with correct data', async () => {
    render(
      <MemoryRouter>
        <Boots />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Boots')).toBeInTheDocument();
      expect(screen.getByText('Boot 1')).toBeInTheDocument();
      expect(screen.getByText('Boot 2')).toBeInTheDocument();
    });
  });

  test('calls Axios to fetch boots data', async () => {
    render(
      <MemoryRouter>
        <Boots />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(Axios.get).toHaveBeenCalledWith(expect.stringContaining('/boot/allBoots'));
    });
  });
});
