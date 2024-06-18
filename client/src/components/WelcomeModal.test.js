import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import WelcomeModal from './WelcomeModal';
import { createMemoryHistory } from 'history';
import { Router as RouterWithHistory } from 'react-router';

describe('WelcomeModal', () => {
  const onCloseMock = jest.fn();

  const setup = (isOpen) => {
    const history = createMemoryHistory();
    render(
      <RouterWithHistory location={history.location} navigator={history}>
        <WelcomeModal isOpen={isOpen} onClose={onCloseMock} />
      </RouterWithHistory>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders null if isOpen is false', () => {
    setup(false);
    expect(screen.queryByText('Welcome!')).toBeNull();
  });

  test('renders WelcomeModal correctly when isOpen is true', () => {
    setup(true);
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('Welcome to the Designher profile. click on your name to view your profile.')).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();
  });

  test('calls onClose when overlay is clicked', () => {
    setup(true);
    fireEvent.click(screen.getByText('Welcome!').closest('.welcomeModal-overlay'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('calls onClose and refreshes page when OK button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <RouterWithHistory location={history.location} navigator={history}>
        <WelcomeModal isOpen={true} onClose={onCloseMock} />
      </RouterWithHistory>
    );

    fireEvent.click(screen.getByText('OK'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
    expect(history.location.state.key).toBeDefined();
  });
});
