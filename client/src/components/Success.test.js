import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Success from '../Success';

describe('Success Component', () => {
  const renderWithRouter = (initialEntries) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Route path="/" component={Success} />
      </MemoryRouter>
    );
  };

  test('renders Success component with default item name', () => {
    renderWithRouter(['/']);

    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Your payment has been received! Your receipt for "your item" will be emailed to you.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go home/i })).toBeInTheDocument();
  });

  test('renders Success component with provided item name', () => {
    const itemName = 'Test Item';
    renderWithRouter([{ pathname: '/', state: { itemName } }]);

    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText(`Your payment has been received! Your receipt for "${itemName}" will be emailed to you.`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go home/i })).toBeInTheDocument();
  });

  test('Go Home button links to home page', () => {
    renderWithRouter(['/']);

    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    expect(goHomeButton.closest('a')).toHaveAttribute('href', '/');
  });
});
