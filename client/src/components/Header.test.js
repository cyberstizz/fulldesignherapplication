import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Axios from 'axios';
import Header from './Header';

jest.mock('axios');

describe('Header', () => {
  beforeEach(() => {
    Axios.get.mockClear();
  });

  test('renders Header component', () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  test('opens login modal when lock icon is clicked', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    fireEvent.click(screen.getByRole('img', { hidden: true })); // Assuming FontAwesomeIcon renders as <svg>
    expect(screen.getByText(/login/i)).toBeInTheDocument(); // Replace with actual text in LoginModal
  });

  test('closes login modal when onClose is called', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    fireEvent.click(screen.getByRole('img', { hidden: true })); // Assuming FontAwesomeIcon renders as <svg>
    fireEvent.click(screen.getByRole('button', { name: /close/i })); // Replace with actual close button role/name
    expect(screen.queryByText(/login/i)).not.toBeInTheDocument(); // Replace with actual text in LoginModal
  });

  test('displays user information if authenticated', async () => {
    const user = { username: 'testuser' };
    Axios.get.mockResolvedValue({ status: 200, data: { user } });

    render(
      <Router>
        <Header />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('testuser')).toBeInTheDocument());
  });

  test('handles search input and form submission', () => {
    const { container } = render(
      <Router>
        <Header />
      </Router>
    );

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test query' } });

    expect(searchInput.value).toBe('test query');

    fireEvent.submit(container.querySelector('form'));

    expect(window.location.pathname).toBe('/search');
    expect(window.history.state).toMatchObject({ query: 'test query' });
  });

  test('opens user modal when username is clicked', async () => {
    const user = { username: 'testuser' };
    Axios.get.mockResolvedValue({ status: 200, data: { user } });

    render(
      <Router>
        <Header />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('testuser')).toBeInTheDocument());
    fireEvent.click(screen.getByText('testuser'));

    expect(screen.getByText(/user settings/i)).toBeInTheDocument(); // Replace with actual text in UserModal
  });

  test('calls logout API and refreshes the page on logout', async () => {
    const user = { username: 'testuser' };
    Axios.get.mockResolvedValueOnce({ status: 200, data: { user } });
    Axios.get.mockResolvedValueOnce({ status: 200 });

    render(
      <Router>
        <Header />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('testuser')).toBeInTheDocument());
    fireEvent.click(screen.getByText('testuser'));
    fireEvent.click(screen.getByRole('button', { name: /logout/i })); // Replace with actual logout button role/name

    await waitFor(() => expect(Axios.get).toHaveBeenCalledWith('/logout'));
    expect(window.location.reload).toHaveBeenCalled();
  });

  test('navigates to home when logo is clicked', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    fireEvent.click(screen.getByClassName('mainLogo'));
    expect(window.location.pathname).toBe('/');
  });

  test('navigates to respective pages when nav items are clicked', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    fireEvent.click(screen.getByText('Jackets'));
    expect(window.location.pathname).toBe('/jackets');

    fireEvent.click(screen.getByText('Crocs'));
    expect(window.location.pathname).toBe('/crocs');

    fireEvent.click(screen.getByText('Sneakers'));
    expect(window.location.pathname).toBe('/sneakers');

    fireEvent.click(screen.getByText('Boots'));
    expect(window.location.pathname).toBe('/boots');
  });
});
