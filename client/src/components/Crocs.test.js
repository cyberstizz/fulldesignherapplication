import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Axios from 'axios';
import Crocs from './Crocs';

jest.mock('axios');

describe('Crocs Component', () => {
  const mockedData = {
    crocs: [
      {
        product_id: 1,
        name: 'Croc 1',
        image_path: 'path/to/image1.jpg',
        product_price: 100,
      },
      {
        product_id: 2,
        name: 'Croc 2',
        image_path: 'path/to/image2.jpg',
        product_price: 150,
      },
    ],
  };

  beforeEach(() => {
    Axios.get.mockResolvedValueOnce({ data: mockedData });
  });

  test('renders Crocs component with correct data', async () => {
    render(<Crocs />);
    await waitFor(() => {
      expect(screen.getByText('Crocs')).toBeInTheDocument();
      expect(screen.getByText('Croc 1')).toBeInTheDocument();
      expect(screen.getByText('Croc 2')).toBeInTheDocument();
    });
  });

  test('calls Axios to fetch crocs data', async () => {
    render(<MemoryRouter> 
        <Crocs />
      </MemoryRouter>
    );    
    await waitFor(() => {
      expect(Axios.get).toHaveBeenCalledWith(expect.stringContaining('/croc/allCrocs'));
    });
  });

  test('renders SubMenuComponent for each croc', async () => {
    render(<Crocs />);
    await waitFor(() => {
      expect(screen.getAllByRole('link')).toHaveLength(mockedData.crocs.length);
    });
  });

  test('SubMenuComponent links to correct product page', async () => {
    render(<MemoryRouter initialEntry="/"> 
        <Crocs />
      </MemoryRouter>
    );    
    await waitFor(() => {
      const firstLink = screen.getAllByRole('link')[0];
      expect(firstLink.getAttribute('href')).toBe('/croc/1'); // Assuming product_id 1 for the first item
    });
  });
});
