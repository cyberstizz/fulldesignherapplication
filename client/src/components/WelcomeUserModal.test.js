import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WelcomeUserModal from './WelcomeUserModal';

describe('WelcomeUserModal', () => {
  const onCloseMock = jest.fn();
  const userMock = 'Test User';

  const setup = (isOpen) => {
    render(
      <WelcomeUserModal
        isOpen={isOpen}
        onClose={onCloseMock}
        user={userMock}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders null if isOpen is false', () => {
    setup(false);
    expect(screen.queryByText(`Welcome ${userMock}!`)).toBeNull();
  });

  test('renders WelcomeUserModal correctly when isOpen is true', () => {
    setup(true);
    expect(screen.getByText(`Welcome ${userMock}!`)).toBeInTheDocument();
    expect(screen.getByText('Thanks for joining the Designher community. We will notify you about important updates and happenings within our ecosystem. You can click your name at the top of the screen to view your profile.')).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();
  });

  test('calls onClose when overlay is clicked', () => {
    setup(true);
    fireEvent.click(screen.getByText(`Welcome ${userMock}!`).closest('.welcomeUserModal-overlay'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when OK button is clicked', () => {
    setup(true);
    fireEvent.click(screen.getByText('OK'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
