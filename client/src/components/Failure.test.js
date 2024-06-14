import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Failure from './Failure';

describe('Failure', () => {
  test('renders the Failure component with correct content', () => {
    render(
      <MemoryRouter>
        <Failure />
      </MemoryRouter>
    );

    expect(screen.getByText(/Payment Unsuccessful!/i)).toBeInTheDocument();
    expect(screen.getByText(/back Home/i)).toBeInTheDocument();
  });

  test('renders the back home button with correct link', () => {
    render(
      <MemoryRouter>
        <Failure />
      </MemoryRouter>
    );

    const backButton = screen.getByRole('button', { name: /back home/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/');
  });
});
