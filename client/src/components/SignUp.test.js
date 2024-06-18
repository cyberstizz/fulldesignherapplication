import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Axios from 'axios';
import SignUp from '../SignUp';

jest.mock('axios');

describe('SignUp Component', () => {
  const onClose = jest.fn();
  const afterSignup = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders SignUp modal when isOpen is true', () => {
    render(<SignUp isOpen={true} onClose={onClose} afterSignup={afterSignup} />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test('does not render SignUp modal when isOpen is false', () => {
    render(<SignUp isOpen={false} onClose={onClose} afterSignup={afterSignup} />);

    expect(screen.queryByLabelText(/username/i)).not.toBeInTheDocument();
  });

  test('handles form input changes', () => {
    render(<SignUp isOpen={true} onClose={onClose} afterSignup={afterSignup} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

    expect(screen.getByLabelText(/username/i).value).toBe('testuser');
    expect(screen.getByLabelText(/first name/i).value).toBe('Test');
    expect(screen.getByLabelText(/last name/i).value).toBe('User');
    expect(screen.getByLabelText(/email/i).value).toBe('testuser@example.com');
    expect(screen.getByLabelText(/password/i).value).toBe('password');
  });

  test('submits the form successfully', async () => {
    Axios.post.mockResolvedValueOnce({ status: 201 });
    render(<SignUp isOpen={true} onClose={onClose} afterSignup={afterSignup} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByText(/sign up/i));

    await waitFor(() => {
      expect(Axios.post).toHaveBeenCalledWith('http://localhost:3001/register', {
        username: 'testuser',
        email_address: 'testuser@example.com',
        password: 'password',
        first_name: 'Test',
        last_name: 'User',
      });
      expect(afterSignup).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  test('handles registration failure', async () => {
    Axios.post.mockRejectedValueOnce(new Error('Registration failed'));
    render(<SignUp isOpen={true} onClose={onClose} afterSignup={afterSignup} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByText(/sign up/i));

    await waitFor(() => {
      expect(Axios.post).toHaveBeenCalled();
      expect(afterSignup).not.toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  test('closes the modal on close button click', () => {
    render(<SignUp isOpen={true} onClose={onClose} afterSignup={afterSignup} />);

    fireEvent.click(screen.getByText(/×/i));

    expect(onClose).toHaveBeenCalled();
  });

  test('does not submit the form when required fields are empty', async () => {
    render(<SignUp isOpen={true} onClose={onClose} afterSignup={afterSignup} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '' } });

    fireEvent.click(screen.getByText(/sign up/i));

    await waitFor(() => {
      expect(Axios.post).not.toHaveBeenCalled();
      expect(afterSignup).not.toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
    });
  });
});
