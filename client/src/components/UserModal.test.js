import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserModal from './UserModal';

describe('UserModal', () => {
  const onCloseMock = jest.fn();
  const onLogoutMock = jest.fn();
  const onProfileMock = jest.fn();
  const userIdMock = { user_id: '12345' };

  const setup = (isOpen) => {
    render(
      <Router>
        <UserModal
          isOpen={isOpen}
          onClose={onCloseMock}
          onLogout={onLogoutMock}
          onProfile={onProfileMock}
          userId={userIdMock}
        />
      </Router>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders null if isOpen is false', () => {
    setup(false);
    expect(screen.queryByText('Profile')).toBeNull();
    expect(screen.queryByText('Logout')).toBeNull();
    expect(screen.queryByText('Close')).toBeNull();
  });

  test('renders UserModal correctly when isOpen is true', () => {
    setup(true);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  test('calls onClose when overlay is clicked', () => {
    setup(true);
    fireEvent.click(screen.getByText('Close'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('calls onProfile when Profile button is clicked', () => {
    setup(true);
    fireEvent.click(screen.getByText('Profile'));
    expect(onProfileMock).toHaveBeenCalledTimes(1);
  });

  test('calls onLogout when Logout button is clicked', () => {
    setup(true);
    fireEvent.click(screen.getByText('Logout'));
    expect(onLogoutMock).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when Close button is clicked', () => {
    setup(true);
    fireEvent.click(screen.getByText('Close'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('link to profile includes correct userId', () => {
    setup(true);
    const profileLink = screen.getByText('Profile').closest('a');
    expect(profileLink).toHaveAttribute('href', '/profile/12345');
  });
});
