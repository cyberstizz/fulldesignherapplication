import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Control from './Control';

jest.mock('axios');
jest.mock('./Header', () => () => <div>Mock Header</div>);
jest.mock('./ControlComponent', () => ({ name, path, product_price, product_id, product_type }) => (
  <div>
    <h2>{name}</h2>
    <img src={path} alt={name} />
    <p>{product_price}</p>
  </div>
));
jest.mock('./CreateModal', () => ({ isOpen, onClose, onCreate }) => (
  isOpen ? <div data-testid="create-modal"><button onClick={() => onClose()}>Close</button></div> : null
));

describe('Control Component', () => {
  const mockProducts = {
    crocs: [
      { product_id: 1, name: 'test_croc', image_path: '/croc.jpg', product_price: 20.99, product_type: 'crocs' }
    ],
    jackets: [
      { product_id: 2, name: 'test_jacket', image_path: '/jacket.jpg', product_price: 50.99, product_type: 'jackets' }
    ],
    sneakers: [
      { product_id: 3, name: 'test_sneaker', image_path: '/sneaker.jpg', product_price: 30.99, product_type: 'sneakers' }
    ],
    boots: [
      { product_id: 4, name: 'test_boot', image_path: '/boot.jpg', product_price: 40.99, product_type: 'boots' }
    ],
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ status: 200, data: mockProducts });
  });

  test('renders header and create button', async () => {
    render(
      <MemoryRouter>
        <Control />
      </MemoryRouter>
    );

    expect(screen.getByText('Mock Header')).toBeInTheDocument();
    expect(screen.getByText('use this button below to add new products')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  test('fetches and displays products on load', async () => {
    render(
      <MemoryRouter>
        <Control />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('test croc')).toBeInTheDocument();
      expect(screen.getByText('test jacket')).toBeInTheDocument();
      expect(screen.getByText('test sneaker')).toBeInTheDocument();
      expect(screen.getByText('test boot')).toBeInTheDocument();
    });
  });

  test('opens and closes create modal', async () => {
    render(
      <MemoryRouter>
        <Control />
      </MemoryRouter>
    );

    const createButton = screen.getByText('New');
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByTestId('create-modal')).toBeInTheDocument();
    });

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('create-modal')).not.toBeInTheDocument();
    });
  });

  // Add more tests as needed for other functionalities, like editing or deleting products
});
