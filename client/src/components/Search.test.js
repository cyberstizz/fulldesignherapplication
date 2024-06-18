import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Search from './Search';
import Header from './Header';
import SubMenuComponent from './SubmenuComponent';
import { useLocation } from 'react-router';

jest.mock('axios');
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(),
}));
jest.mock('./Header', () => () => <div>Header</div>);
jest.mock('./SubmenuComponent', () => ({ onImageLoad, name, path, product_price }) => (
  <div>
    <img src={path} onLoad={onImageLoad} alt={name} />
    <div>{name}</div>
    <div>{product_price}</div>
  </div>
));

describe('Search Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Header component', () => {
    useLocation.mockReturnValue({ state: { query: 'test' } });

    render(
      <Router>
        <Search />
      </Router>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  test('fetches and displays search results', async () => {
    const mockData = {
      data: [
        {
          product_id: '1',
          product_type: 'sneakers',
          name: 'Test_Sneaker',
          image_path: '/images/sneaker.jpg',
          product_price: 100,
        },
      ],
    };

    axios.get.mockResolvedValueOnce(mockData);
    useLocation.mockReturnValue({ state: { query: 'sneaker' } });

    render(
      <Router>
        <Search />
      </Router>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/search?query=sneaker');
    });

    await waitFor(() => {
      expect(screen.getByText('Test Sneaker')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });
  });

  test('displays no items found message when there are no search results', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    useLocation.mockReturnValue({ state: { query: 'nonexistent' } });

    render(
      <Router>
        <Search />
      </Router>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/search?query=nonexistent');
    });

    await waitFor(() => {
      expect(screen.getByText('There are no items that match your search.')).toBeInTheDocument();
    });
  });

  test('handles query being undefined', () => {
    useLocation.mockReturnValue({ state: {} });

    render(
      <Router>
        <Search />
      </Router>
    );

    expect(screen.getByText('Search Results')).toBeInTheDocument();
  });

  test('properLettering function removes underscores and replaces with spaces', () => {
    useLocation.mockReturnValue({ state: { query: 'test' } });

    render(
      <Router>
        <Search />
      </Router>
    );

    expect(screen.getByText('Search Results')).toBeInTheDocument();
  });

  test('properProductType function removes trailing "s"', () => {
    useLocation.mockReturnValue({ state: { query: 'test' } });

    render(
      <Router>
        <Search />
      </Router>
    );

    expect(screen.getByText('Search Results')).toBeInTheDocument();
  });
});
