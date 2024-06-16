// src/components/LoginModal.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import LoginModal from './LoginModal';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LoginModal Component', () => {
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);

  const mockHandleModalToggle = jest.fn();
  const mockHandleOpen = jest.fn();
  const mockOnClose = jest.fn();

  const renderComponent = (isOpen = true) =>
    render(
      <Router>
        <LoginModal
          isOpen={isOpen}
          onClose={mockOnClose}
          handleModalToggle={mockHandleModalToggle}
          handleOpen={mockHandleOpen}
        />
      </Router>
    );

  beforeEach(() => {
    Axios.post.mockClear();
    mockNavigate.mockClear();
    mockHandleModalToggle.mockClear();
    mockHandleOpen.mockClear();
    mockOnClose.mockClear();
  });

  test('renders login modal when open', () => {
    renderComponent();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('does not render login modal when closed', () => {
    renderComponent(false);
    expect(screen.queryByText('Username')).not.toBeInTheDocument();
    expect(screen.queryByText('Password')).not.toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  test('handles login form submission with correct credentials', async () => {
    process.env.REACT_APP_USERNAME = 'testuser';
    process.env.REACT_APP_PASSWORD = 'testpass';

    renderComponent();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'testpass' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/control'));
  });

  test('handles login form submission with incorrect credentials and API call', async () => {
    Axios.post.mockResolvedValueOnce({ status: 200 });

    renderComponent();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'wronguser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => expect(Axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/login'),
      { username: 'wronguser', password: 'wrongpass' }
    ));

    await waitFor(() => {
      expect(mockHandleOpen).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  test('displays error message on login failure', async () => {
    Axios.post.mockRejectedValueOnce(new Error('Login failed'));

    renderComponent();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'wronguser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => expect(Axios.post).toHaveBeenCalled());
    await waitFor(() => expect(mockOnClose).toHaveBeenCalled());

    // You can add more assertions here to check if the error message is displayed in your component
  });

  test('closes modal on close button click', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /times/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls handleModalToggle on create account link click', () => {
    renderComponent();
    fireEvent.click(screen.getByText(/create account/i));
    expect(mockHandleModalToggle).toHaveBeenCalledWith('signup');
  });
});
